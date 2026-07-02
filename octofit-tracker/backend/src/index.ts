import { startServer } from './server';

startServer().catch((error) => {
  console.error('Failed to start Octofit API', error);
  process.exit(1);
});
