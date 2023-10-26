import { readFileSync, writeFileSync } from "fs";
import Mustache from "mustache";
import baseInformation from "../data/baseInformation.json";

const tableHeaderMd = `| key | value |
| --- | --- |
`;

class MdGenerator {
  private template: string;

  constructor() {
    this.template = readFileSync(`${__dirname}/template.md`, "utf-8");
  }

  run() {
    const output = Mustache.render(this.template, {
      baseInformation: this.convBaseInformationToMd(),
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
}

const main = () => {
  const g = new MdGenerator();
  g.run();
};

if (require.main === module) main();
