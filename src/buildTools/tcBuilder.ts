import {
  resolution,
  TCBuilder,
  move,
  getProjectStatus,
  compileProject,
  formatProjectResults,
} from '@ioffice/tc-builder';
import { rulesTestOrder } from '../test/rules';
import { GuideTester, RulesTester } from '../test';
import { topicOrder } from '../guide';
import { readFileSync, writeFileSync } from "fs";

class Builder extends TCBuilder {
  onBeforeNpmPublish(fulfill: resolution, reject: resolution): void {
    try {
      move('./build/rules', '.');
    } catch (err) {
      return reject('Unable to move build contents to publish.');
    }
    try {
      updateConfigFile();
    } catch (err) {
      return reject('Unable to rewrite config file.')
    }

    fulfill('Ready to publish.');
  }

  onTest(fulfill: resolution, reject: resolution): void {
    // Testing the rules
    const ruleTester = new RulesTester(rulesTestOrder);
    const rulesResults = ruleTester.runTests();
    if (rulesResults.filter(x => x.status === 'failed').length) {
      return reject('RulesTester found failed tests');
    }

    // Testing the code with the new rules
    const projectResults = compileProject('./tsconfig.json', './tslint-config-ioffice.json');
    const projectStatus = getProjectStatus(projectResults, {});
    if (projectStatus.status !== 0) {
      console.log(formatProjectResults(projectStatus, projectResults));
      return reject('Project code does not adhere to the new rules');
    }

    // Testing the guide
    const guideTester = new GuideTester('iOffice TypeScript Style Guide', topicOrder);
    const guideResults = guideTester.runTests();
    if (guideResults.filter(x => x.status === 'failed').length) {
      return reject('GuideTester found failed tests');
    }
    fulfill('Testing passed');
  }
}

/**
 * We need to make sure that the configuration file points to the correct paths once the file
 * is downloaded from the npm registry.
 */
function updateConfigFile() {
  const configPath = './tslint-config-ioffice.json';
  const obj = JSON.parse(readFileSync(configPath, 'utf8'));
  const tslint = JSON.parse(readFileSync('./tslint.json', 'utf8'))
  obj['rulesDirectory'] = [
    "./rules",
    "../../tslint-eslint-rules/dist/rules"
  ];
  Object.assign(obj['rules'], tslint['rules']);

  writeFileSync(configPath, JSON.stringify(obj, null, 2));
}

const pb = new Builder();
pb.build();
