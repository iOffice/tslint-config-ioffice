import { SectionTests } from './SectionTests';
import { Test } from './Test';

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
}

export {
  RuleTester,
};
