import { readFileSync, writeFileSync } from "fs";
import Mustache from "mustache";
import baseInformation from "../data/baseInformation.json";
import projects from "../data/projects.json";

const tableHeaderMd = `| key | value |
| --- | --- |
`;

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
  private projectTemplate: string;
  private technologiesTemplate: string;

  constructor() {
    this.template = readFileSync(`${__dirname}/template.md`, "utf-8");
    this.projectTemplate = readFileSync(
      `${__dirname}/projectTemplate.md`,
      "utf-8"
    );

    let t = "";
    for (const [key, value] of technologyPropertyAndNameMap) {
      t += Mustache.render(
        "##### {{ value }}\n\n{{ open }} {{ key }} {{ close }}\n\n",
        {
          value,
          key,
          open: "{{",
          close: "}}",
        }
      );
    }
    this.technologiesTemplate = t;
  }

  run() {
    const output = Mustache.render(this.template, {
      baseInformation: this.convBaseInformationToMd(),
      projects: this.convProjectsToMd(),
    });
    writeFileSync(`${__dirname}/../generated/README.md`, output);
  }

  private convBaseInformationToMd() {
    let output = tableHeaderMd;
    for (const e of baseInformation) {
      output += `| ${e.key} | ${e.value} |\n`;
    }
    return output;
  }

  private convProjectsToMd() {
    let output = "";
    for (const e of projects) {
      output += Mustache.render(this.projectTemplate, {
        ...e,
        jobResponsibilities: this.arrToMd(e.jobResponsibilities),
        technologies: Mustache.render(
          this.technologiesTemplate,
          e.technologies
        ),
      });
    }
    return output;
  }

  private arrToMd(arr: string[]) {
    let output = "";
    for (const e of arr) {
      output += `- ${e}\n`;
    }
    return output;
  }
}

const main = () => {
  const g = new MdGenerator();
  g.run();
};

if (require.main === module) main();
