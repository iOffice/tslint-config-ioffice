import { Test } from './Test';
import { SectionTests } from './SectionTests';

class RuleTester {
  ruleName: string;
  sections: SectionTests[] = [];

  constructor(ruleName: string) {
    this.ruleName = ruleName;
  }

  public addSection(sectionName: string, tests: (Test | string)[]): this {
    this.sections.push(new SectionTests(this.ruleName, sectionName, tests));
    return this;
  }

  public runTests(): void {
    // const singleTest = JSON.parse(process.env.SINGLE_TEST || 'null');
    // const runGroup = singleTest === null || singleTest.group === null;
    // const runIndex = singleTest === null || singleTest.num === null;
    // describe(this.ruleName, () => {
    //   this.groups.forEach((group) => {
    //     if (runGroup || group.name === singleTest.group) {
    //       it(group.description, () => {
    //         group.tests.forEach((test, index) => {
    //           if (runIndex || singleTest.num === index) {
    //             test.runTest();
    //           }
    //         });
    //       });
    //     }
    //   });
    // });
  }
}

export {
  RuleTester,
}
