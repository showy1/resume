import { readFileSync, writeFileSync } from "fs";
import Mustache from "mustache";
import baseInformation from "../data/baseInformation.json";
import pr from "../data/pr.json";
import projects from "../data/projects.json";

const tableHeaderMd = `| key | value |
| --- | --- |
`;

const technologyStackProperties = [
  "languages",
  "db",
  "mainFrameworks",
  "awsServices",
  "others",
] as const;

type Technologies = (typeof projects)[number]["technologies"];

const technologyPropertyAndNameMap = new Map<keyof Technologies, string>([
  ["languages", "言語"],
  ["iaas", "IaaS"],
  ["db", "DB"],
  ["mainFrameworks", "フレームワーク・主要ライブラリ"],
  ["iaasServices", "IaaS 内サービス"],
  ["others", "その他"],
]);

class MdGenerator {
  private template: string;
  private technologyStackTemplate: string;
  private projectTemplate: string;

  constructor() {
    this.template = readFileSync(`${__dirname}/template.md`, "utf-8");
    this.technologyStackTemplate = readFileSync(
      `${__dirname}/technologyStackTemplate.md`,
      "utf-8"
    );
    this.projectTemplate = readFileSync(
      `${__dirname}/projectTemplate.md`,
      "utf-8"
    );
  }

  run() {
    const output = Mustache.render(this.template, {
      baseInformation: this.convBaseInformationToMd(),
      pr: this.convPRtoMd(),
      technologyStack: this.convTechnologyStackToMd(),
      projects: this.convProjectsToMd(),
    });
    writeFileSync(`${__dirname}/../generated/README.md`, output);
  }

  private convBaseInformationToMd() {
    let output = tableHeaderMd;
    let rows = baseInformation.map((e) => `| ${e.key} | ${e.value} |`);
    return output + rows.join("\n");
  }

  private convPRtoMd() {
    return this.arrToMd(pr);
  }

  private convTechnologyStackToMd() {
    const stack = new Map<
      (typeof technologyStackProperties)[number],
      Set<string>
    >(technologyStackProperties.map((k) => [k, new Set()]));

    for (const project of projects) {
      for (const k of technologyStackProperties) {
        if (k === "awsServices") {
          if (project.technologies.iaas.main[0] !== "AWS") continue;
          for (const str of project.technologies.iaasServices.main) {
            stack.get("awsServices")?.add(str);
          }
        } else {
          for (const str of project.technologies[k].main) {
            stack.get(k)?.add(str);
          }
        }
      }
    }

    return Mustache.render(
      this.technologyStackTemplate,
      Object.fromEntries([...stack].map(([k, v]) => [k, [...v].join(", ")]))
    );
  }

  private convProjectsToMd() {
    let output = "";
    for (const e of projects) {
      output +=
        Mustache.render(this.projectTemplate, {
          ...e,
          jobResponsibilities: this.arrToMd(e.jobResponsibilities),
          technologies: this.convTechnologiesToMd(e.technologies),
        }) + "\n";
    }
    return output;
  }

  private arrToMd(arr: string[]) {
    return arr.map((e) => `- ${e}`).join("\n");
  }

  private convTechnologiesToMd(technologies: Technologies) {
    return [...technologyPropertyAndNameMap]
      .map(([k, v]) => `- ${v}: ${this.convTechArrsToStr(technologies[k])}`)
      .join("\n");
  }

  private convTechArrsToStr(t: { main: string[]; sub?: string[] }) {
    let elmsStr = t.main.join(", ");
    if (t.sub) {
      elmsStr += `, (${t.sub.join(", ")})`;
    }
    return elmsStr;
  }
}

const main = () => {
  const g = new MdGenerator();
  g.run();
};

if (require.main === module) main();
