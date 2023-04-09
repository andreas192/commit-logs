import minimist from 'minimist';
import CommitLog from './lib/commit-log.js';

const argv = minimist(process.argv.slice(2));

const commitMessage = argv['m'];

const commitLog = await CommitLog.initialize();

const commitLogByDate = CommitLog.groupByDate(commitLog);

const commitLogOutput = CommitLog.processMessage(commitLogByDate, commitMessage);

await CommitLog.generateCsv(Object.values(commitLogOutput));
