import * as Lint from 'tslint';
import { LintFailure } from './Failure';
import { Test, LintTest } from './Test';

class SectionTests {
  public topicName: string;
  public sectionName: string;
  public tests: LintTest[];

  constructor(
    topicName: string,
    sectionName: string,
    tests: (Test | string)[],
    lintConfig?: Lint.Configuration.IConfigurationFile
  ) {
    this.topicName = topicName;
    this.sectionName = sectionName;
    this.tests = tests.map((test: Test | string, index) => {
      const config: any = lintConfig || { rules: { [topicName]: true } };
      const codeFileName = `${topicName}_${sectionName}_${index}.ts`;
      if (typeof test === 'string') {
        const configuration = Lint.Configuration.parseConfigFile(config);
        return new LintTest(codeFileName, test, '', configuration, []);
      }
      if (test.options) {
        config.rules[topicName] = [true, ...test.options];
      }

      const configFile = Lint.Configuration.parseConfigFile(config);
      const failures: LintFailure[] = (test.errors || []).map((error) => {
        return new LintFailure(
          codeFileName,
          error.ruleName,
          error.failure,
          error.startPosition,
          error.endPosition
        );
      });
      return new LintTest(codeFileName, test.code, test.output || '', configFile, failures);
    });
  }
}

export {
  SectionTests,
};
