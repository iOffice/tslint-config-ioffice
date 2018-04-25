import { resolution, TCBuilder, move } from '@ioffice/tc-builder';
import { rulesTestOrder } from '../test/rules';
import { GuideTester, RulesTester } from '../test';
import { topicOrder } from '../guide';
import { readFileSync, writeFileSync } from "fs";

class Builder extends TCBuilder {
  onBeforeNpmPublish(fulfill: resolution, reject: resolution): void {
    try {
      move('build/rules', './rules');
      updateConfigFile();
      fulfill('Ready to publish.');
    } catch (err) {
      reject('Unable to move build contents to publish.');
    }
  }

  onTest(fulfill: resolution, reject: resolution): void {
    const ruleTester = new RulesTester(rulesTestOrder);
    const rulesResults = ruleTester.runTests();
    if (rulesResults.filter(x => x.status === 'failed').length) {
      return reject('RulesTester found failed tests');
    }
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
  const contents = readFileSync('tslint-config-ioffice.json', 'utf8');
  const obj = JSON.parse(contents);
  obj['rulesDirectory'] = [
    "./rules",
    "node_modules/tslint-eslint-rules/dist/rules"
  ];
  writeFileSync('package.json', JSON.stringify(obj, null, 2));
}

const pb = new Builder();
pb.build();