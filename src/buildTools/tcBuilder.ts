import {
  getProjectStatus,
  compileProject,
  formatProjectResults,
  NPMBuilder,
  Util,
  runBuilder,
} from '@ioffice/tc-builder';
import { rulesTestOrder } from '../test/rules';
import { GuideTester, RulesTester } from '../test';
import { topicOrder } from '../guide';
import { readFileSync, writeFileSync } from "fs";

class Builder extends NPMBuilder {
  util = Util.getInstance();

  async beforePublish() {
    try {
      this.util.move('./build/rules', '.');
    } catch (err) {
      return this.io.failure(`Failed moving 'build/main/' to root directory:\n${err.toString()}`);
    }
    try {
      this.updateConfigFile();
    } catch (err) {
      return this.io.failure(`Unable to rewrite config file:\n${err.toString()}`);
    }

    this.io.log('Ready to publish.');
  }

  async test() {
    // Testing the rules
    const ruleTester = new RulesTester(rulesTestOrder);
    const rulesResults = ruleTester.runTests();
    if (rulesResults.filter(x => x.status === 'failed').length) {
      return this.io.failure('RulesTester found failed tests');
    }

    // Testing the code with the new rules
    const projectResults = compileProject('./tsconfig.json', './tslint-config-ioffice.json');
    const projectStatus = getProjectStatus(projectResults, {});
    if (projectStatus.status !== 0) {
      console.log(formatProjectResults(projectStatus, projectResults));
      return this.io.failure('Project code does not adhere to the new rules');
    }

    // Testing the guide
    const guideTester = new GuideTester('iOffice TypeScript Style Guide', topicOrder);
    const guideResults = guideTester.runTests();
    if (guideResults.filter(x => x.status === 'failed').length) {
      return this.io.failure('GuideTester found failed tests');
    }
    this.io.log('Testing passed');
  }

  /**
   * We need to make sure that the configuration file points to the correct paths once the file
   * is downloaded from the npm registry.
   */
  private updateConfigFile() {
    const configPath = './tslint-config-ioffice.json';
    const obj = JSON.parse(readFileSync(configPath, 'utf8'));
    const tslint = JSON.parse(readFileSync('./tslint.json', 'utf8'));
    obj['rulesDirectory'] = [
      "./rules",
      "../../tslint-eslint-rules/dist/rules",
    ];
    Object.assign(obj['rules'], tslint['rules']);

    writeFileSync(configPath, JSON.stringify(obj, null, 2));
  }
}

async function main() {
  const { code } = await runBuilder(Builder);

  process.on('exit', () => {
    process.exit(code);
  });
}

main();
