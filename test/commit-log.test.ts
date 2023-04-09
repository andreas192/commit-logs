import CommitLog from '../lib/commit-log';

describe('commit-log.js', () => {
    it('should initialize with empty array', async () => {
        const commitLog = await CommitLog.initialize();

        expect(commitLog).toBeInstanceOf('Array');
        expect(commitLog).toHaveLength(0);
    })
});