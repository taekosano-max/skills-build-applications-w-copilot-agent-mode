import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';
import { connectToDatabase, mongoUri } from './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'Octofit Tracker API is running',
    apiBaseUrl: getApiBaseUrl(),
  });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await User.find({}).lean();
  res.json({
    message: 'Users endpoint',
    users,
  });
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await Team.find({}).populate('members').populate('captain').lean();
  res.json({
    message: 'Teams endpoint',
    teams,
  });
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await Activity.find({}).populate('user').lean();
  res.json({
    message: 'Activities endpoint',
    activities,
  });
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('user').sort({ rank: 1 }).lean();
  res.json({
    message: 'Leaderboard endpoint',
    leaderboard,
  });
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find({}).lean();
  res.json({
    message: 'Workouts endpoint',
    workouts,
  });
});

const startServer = async () => {
  await connectToDatabase();
  console.log(`Connected to MongoDB at ${mongoUri}`);

  app.listen(port, () => {
    console.log(`Octofit API listening on http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start Octofit API', error);
  process.exit(1);
});
