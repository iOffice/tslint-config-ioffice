import { updateReadme } from './readme';
import { testGuide, formatResults } from './test';


const tasks: any = {
  readme() {
    updateReadme();
  },

  test() {
    const results = testGuide();
    process.stdout.write(formatResults(results));
  },
};

const task = process.argv[2];
tasks[task]();
