import { connectDatabase } from '../db';
import { UserModel } from '../models/user.model';
import { TeamModel } from '../models/team.model';
import { WorkoutModel } from '../models/workout.model';
import { ActivityModel } from '../models/activity.model';
import { LeaderboardModel } from '../models/leaderboard.model';

/**
 * Seed the octofit_db database with test data.
 */
async function seed(): Promise<void> {
  await connectDatabase();

  console.log('Clearing existing seed data...');
  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
  ]);

  console.log('Creating teams...');
  const teams = await TeamModel.create([
    {
      name: 'Coastal Chargers',
      description: 'A resilient group of runners and cross-trainers focused on beachside cardio.',
      foundedAt: new Date('2024-09-10'),
    },
    {
      name: 'Summit Squad',
      description: 'Mountain athletes training for peak performance and endurance.',
      foundedAt: new Date('2024-05-14'),
    },
  ]);

  console.log('Creating users...');
  const users = await UserModel.create([
    {
      name: 'Ava Morgan',
      email: 'ava.morgan@example.com',
      role: 'athlete',
      team: teams[0]._id,
      joinedAt: new Date('2025-02-12'),
    },
    {
      name: 'Noah Patel',
      email: 'noah.patel@example.com',
      role: 'athlete',
      team: teams[0]._id,
      joinedAt: new Date('2025-01-22'),
    },
    {
      name: 'Mia Chen',
      email: 'mia.chen@example.com',
      role: 'coach',
      team: teams[1]._id,
      joinedAt: new Date('2024-11-03'),
    },
    {
      name: 'Liam Davis',
      email: 'liam.davis@example.com',
      role: 'athlete',
      team: teams[1]._id,
      joinedAt: new Date('2025-03-01'),
    },
  ]);

  console.log('Attaching users to teams...');
  await Promise.all(
    teams.map(async (team) => {
      const memberIds = users.filter((user) => String(user.team) === String(team._id)).map((user) => user._id);
      team.members = memberIds;
      await team.save();
    })
  );

  console.log('Creating workouts...');
  const workouts = await WorkoutModel.create([
    {
      title: 'Sunrise HIIT',
      description: 'A fast-paced interval routine for explosive energy and burning calories.',
      difficulty: 'intermediate',
      durationMinutes: 30,
      focus: 'cardio',
    },
    {
      title: 'Trail Strength',
      description: 'Leg and core endurance session perfect for trail runners.',
      difficulty: 'advanced',
      durationMinutes: 45,
      focus: 'strength',
    },
    {
      title: 'Recovery Flow',
      description: 'Low-impact mobility and stretch work for active recovery days.',
      difficulty: 'beginner',
      durationMinutes: 25,
      focus: 'flexibility',
    },
  ]);

  console.log('Creating activities...');
  const activities = await ActivityModel.create([
    {
      user: users[0]._id,
      workout: workouts[0]._id,
      durationMinutes: 30,
      caloriesBurned: 320,
      date: new Date('2025-03-20T07:15:00Z'),
      notes: 'Strong pace with consistent intervals.',
    },
    {
      user: users[1]._id,
      workout: workouts[1]._id,
      durationMinutes: 44,
      caloriesBurned: 410,
      date: new Date('2025-03-19T17:30:00Z'),
      notes: 'Focused on hill climbs and core stability.',
    },
    {
      user: users[3]._id,
      workout: workouts[2]._id,
      durationMinutes: 25,
      caloriesBurned: 150,
      date: new Date('2025-03-18T09:00:00Z'),
      notes: 'Recovery routine after long run.',
    },
  ]);

  console.log('Creating leaderboard entries...');
  await LeaderboardModel.create([
    {
      user: users[0]._id,
      rank: 1,
      totalPoints: 1240,
      weeklyScore: 340,
      lastActive: new Date('2025-03-20T07:15:00Z'),
    },
    {
      user: users[1]._id,
      rank: 2,
      totalPoints: 980,
      weeklyScore: 260,
      lastActive: new Date('2025-03-19T17:30:00Z'),
    },
    {
      user: users[3]._id,
      rank: 3,
      totalPoints: 820,
      weeklyScore: 210,
      lastActive: new Date('2025-03-18T09:00:00Z'),
    },
  ]);

  console.log('Seed data created successfully.');
  console.log({
    teamCount: teams.length,
    userCount: users.length,
    workoutCount: workouts.length,
    activityCount: activities.length,
  });

  await process.exit(0);
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
