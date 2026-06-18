import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './db';
import { UserModel } from './models/user.model';
import { TeamModel } from './models/team.model';
import { ActivityModel } from './models/activity.model';
import { LeaderboardModel } from './models/leaderboard.model';
import { WorkoutModel } from './models/workout.model';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await UserModel.find().populate('team', 'name description');
  res.json({ apiBaseUrl, users });
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await TeamModel.find().populate('members', 'name email role');
  res.json({ apiBaseUrl, teams });
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await ActivityModel.find()
    .populate('user', 'name email')
    .populate('workout', 'title difficulty');
  res.json({ apiBaseUrl, activities });
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardModel.find().populate('user', 'name email');
  res.json({ apiBaseUrl, leaderboard });
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await WorkoutModel.find();
  res.json({ apiBaseUrl, workouts });
});

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Octofit Tracker API is running on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
