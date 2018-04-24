import { LintFailure } from './Failure';
import { Test, LintTest } from './test';

class SectionTests {
  public topicName: string;
  public sectionName: string;
  public tests: LintTest[];

  constructor(topicName: string, sectionName: string, tests: (Test | string)[], lintConfig?: any) {
    this.topicName = topicName;
    this.sectionName = sectionName;
    this.tests = tests.map((test: Test | string, index) => {
      const codeFileName = `${topicName}_${sectionName}_${index}.ts`;
      const config: any = lintConfig || { rules: { [topicName]: true } };
      if (typeof test === 'string') {
        return new LintTest(codeFileName, test, '', config, []);
      }
      if (test.options) {
        config.rules[topicName] = [true, ...test.options];
      }
      const failures: LintFailure[] = (test.errors || []).map((error) => {
        return new LintFailure(
          codeFileName,
          error.ruleName,
          error.failure,
          error.startPosition,
          error.endPosition
        );
      });
      return new LintTest(codeFileName, test.code, test.output || '', config, failures);
    });
  }
}

export {
  SectionTests,
}
