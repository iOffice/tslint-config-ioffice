import * as Lint from 'tslint';

const dedent = Lint.Utils.dedent;


class TestGroup {
  public name: string;
  public ruleName: string;
  public description: string;
  public tests: Test[];

  constructor(name: string, description: string, ruleName: string, tests: (ITest | string)[]) {
    this.name = name;
    this.ruleName = ruleName;
    this.description = description;
    this.tests = tests.map((test: ITest | string, index) => {
      const config: any = { rules: { [ruleName]: true } };
      const codeFileName = `${name}-${index}.ts`;
      if (typeof test === 'string') {
        return new Test(codeFileName, test, undefined, config, []);
      }
      if (test.options) {
        config.rules[ruleName] = [true, ...test.options];
      }
      const failures: LintFailure[] = (test.errors || []).map((error) => {
        return new LintFailure(
          codeFileName,
          ruleName,
          error.failure,
          error.startPosition,
          error.endPosition
        );
      });
      return new Test(codeFileName, test.code, test.output, config, failures);
    });
  }
}

class RuleTester {
  private ruleName: string;
  private groups: TestGroup[] = [];

  constructor(ruleName: string) {
    this.ruleName = ruleName;
  }

  public addTestGroup(name: string, description: string, tests: (ITest | string)[]): this {
    this.groups.push(new TestGroup(name, description, this.ruleName, tests));
    return this;
  }

  public runTests(): void {
    const singleTest = JSON.parse(process.env.SINGLE_TEST || 'null');
    const runGroup = singleTest === null || singleTest.group === null;
    const runIndex = singleTest === null || singleTest.num === null;
    describe(this.ruleName, () => {
      this.groups.forEach((group) => {
        if (runGroup || group.name === singleTest.group) {
          it(group.description, () => {
            group.tests.forEach((test, index) => {
              if (runIndex || singleTest.num === index) {
                test.runTest();
              }
            });
          });
        }
      });
    });
  }
}

export {
  dedent,
  Position,
  Failure,
  TestGroup,
  RuleTester,
  readFixture,
};
