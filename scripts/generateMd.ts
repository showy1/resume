import { readFileSync, writeFileSync } from "fs";
import Mustache from "mustache";
import baseInformation from "../data/baseInformation.json";
import otherProjects from "../data/otherProjects.json";
import pr from "../data/pr.json";
import projects from "../data/projects.json";
import technologies from "../data/technologies.json";

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
type TechnologiesKey = keyof Technologies;

type OtherProjectTechnologies = Partial<Record<TechnologiesKey, string[]>>;

const technologyPropertyAndNameMap = new Map<TechnologiesKey, string>([
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
  private otherProjectTemplate: string;

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
    this.otherProjectTemplate = readFileSync(
      `${__dirname}/otherProjectTemplate.md`,
      "utf-8"
    );
  }

  run() {
    const output = Mustache.render(this.template, {
      baseInformation: this.convBaseInformationToMd(),
      pr: this.convPRtoMd(),
      technologyStack: this.convTechnologyStackToMd(),
      projects: this.convProjectsToMd(),
      otherProjects: this.convOtherProjectsToMd(),
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

    for (const k of technologyStackProperties) {
      for (const p of projects) {
        const pTechnologies = p.technologies;
        if (k === "awsServices") {
          if (pTechnologies.iaas.main[0] !== "AWS") continue;
          for (const str of pTechnologies.iaasServices.main) {
            stack.get("awsServices")?.add(str);
          }
        } else {
          for (const str of pTechnologies[k].main) {
            stack.get(k)?.add(str);
          }
        }
      }

      for (const op of otherProjects) {
        const opTechnologies: OtherProjectTechnologies = op.technologies;
        if (k === "awsServices") {
          if (opTechnologies.iaas?.[0] !== "AWS") continue;
          for (const str of opTechnologies.iaasServices ?? []) {
            stack.get("awsServices")?.add(str);
          }
        } else {
          for (const str of opTechnologies[k] ?? []) {
            stack.get(k)?.add(str);
          }
        }
      }
    }

    const techMainFrameworks = Object.values(
      technologies.mainFrameworks
    ).flat();
    for (const e of stack.get("mainFrameworks")!) {
      if (!techMainFrameworks.includes(e)) {
        throw new Error(`${e} is not included in technologies.mainFrameworks`);
      }
    }
    const techOthers = Object.values(technologies.others).flat();
    for (const e of stack.get("others")!) {
      if (!techOthers.includes(e)) {
        throw new Error(`${e} is not included in technologies.others`);
      }
    }

    return Mustache.render(this.technologyStackTemplate, {
      languages: [...stack.get("languages")!].join(", "),
      db: [...stack.get("db")!].join(", "),
      backendMainFrameworks: technologies.mainFrameworks.backend.join(", "),
      frontendMainFrameworks: technologies.mainFrameworks.frontend.join(", "),
      otherMainFrameworks: technologies.mainFrameworks.others.join(", "),
      awsServices: [...stack.get("awsServices")!].join(", "),
      backendOthers: technologies.others.backend.join(", "),
      frontendOthers: technologies.others.frontend.join(", "),
      cicdOthers: technologies.others.cicd.join(", "),
      web3Others: technologies.others.web3.join(", "),
      xaasOthers: technologies.others.xaas.join(", "),
      otherOthers: technologies.others.others.join(", "),
    });
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

  private convOtherProjectsToMd() {
    let output = "";
    for (const e of otherProjects) {
      output +=
        Mustache.render(this.otherProjectTemplate, {
          title: e.title,
          technologies: this.convOtherProjectTechnologiesToMd(e.technologies),
        }) + "\n";
    }
    return output;
  }

  private arrToMd(arr: string[]) {
    return arr.map((e) => `- ${e}`).join("\n");
  }

  private convTechnologiesToMd(ts: Technologies) {
    return [...technologyPropertyAndNameMap]
      .map(([k, v]) => `- ${v}: ${this.convTechArrsToStr(ts[k])}`)
      .join("\n");
  }

  private convOtherProjectTechnologiesToMd(ts: OtherProjectTechnologies) {
    return [...technologyPropertyAndNameMap]
      .filter(([k]) => ts[k])
      .map(([k, v]) => `- ${v}: ${ts[k]?.join(", ")}`)
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
