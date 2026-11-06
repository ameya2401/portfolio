const rawArgs = process.argv.slice(2).flatMap((v) => v === '--host' ? ['--hostname'] : v === '--strictPort' ? [] : [v]);
const args = rawArgs.includes('dev') ? rawArgs : ['dev', ...rawArgs];
process.argv = [process.argv[0], process.argv[1], ...args];
await import('next/dist/bin/next');
