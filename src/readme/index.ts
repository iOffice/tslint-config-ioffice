import * as fs from 'fs';
import { ISection, IExample } from '../util';
import { topicOrder } from '../guide';

function createSection(num: string, ref: string, sec: ISection, lines: string[]): void {
  lines.push(`  <a name="${ref}"></a><a name="${num}"></a>`);
  const rule = sec.rule.trim().split('\n').join('\n    ');
  const reason = (sec.reason || '').split('\n').join('\n    > ');
  const name = sec.name.trim();
  lines.push(`  - [${num}](#${ref}) **${name}**: ${rule}`);
  lines.push('');
  if (reason) {
    lines.push(reason);
    lines.push('');
  }

  sec.examples.forEach((example: IExample) => {
    const code = example.code.trim().split('\n').join('\n    ');
    lines.push('    ```ts');
    lines.push(`    ${code}`);
    lines.push('    ```');
    lines.push('');
  });

}

function createReadme(): string {
  const toc: string[] = ['## Table of Contents\n'];
  const topics: string[] = [];

  topicOrder.forEach((topic, index) => {
    toc.push(`  ${index+1}. [${topic.name}](#${topic.reference})`);
    topic.order.forEach((module: any, subIndex: number) => {
      const sec: ISection = module.section;
      toc.push(`      ${subIndex+1}. [${sec.name}](#${topic.reference}--${sec.reference})`);
    });
  });

  topicOrder.forEach((topic, index) => {
    topics.push(`## ${topic.name}\n`);
    topic.order.forEach((module: any, subIndex: number) => {
      const num = `${index + 1}.${subIndex + 1}`;
      const ref = `${topic.reference}--${module.section.reference}`;
      createSection(num, ref, module.section, topics);
    });
    topics.push('**[⬆ back to top](#table-of-contents)**');
    topics.push('');
  });

  const lines: string[] = [
    '<!-- THIS IS AN AUTO-GENERATED FILE - DO NOT MODIFY MANUALLY -->',
    '# iOffice TypeScript Style Guide\n',
    '[![NPM Version](https://img.shields.io/npm/v/@ioffice/tslint-config-ioffice.svg)](https://www.npmjs.com/package/@ioffice/tslint-config-ioffice)',
    '[![License](https://img.shields.io/npm/l/tslint-config-ioffice.svg)](LICENSE)',
    '[![Build Status](https://travis-ci.com/iOffice/tslint-config-ioffice.svg?branch=master)](https://travis-ci.com/iOffice/tslint-config-ioffice)\n',
    'Disclaimer: This guide is inspired by the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).',
    'Most sections we see here will be taken straight from their guide and slowly adapted to the typescript language.',
  ];
  lines.push(...toc);
  lines.push('');
  lines.push(...topics);
  lines.push('## License\n');
  lines.push(fs.readFileSync('./LICENSE').toString());
  lines.push(fs.readFileSync('./AMENDMENTS.md').toString());
  return lines.join('\n');
}

function updateReadme() {
  fs.writeFile('README.md', createReadme(), 'utf8', (writeErr) => {
    if (writeErr) {
      return console.error(writeErr);
    }
    console.log('[DONE] README.md');
  });
}

export {
  updateReadme,
};
