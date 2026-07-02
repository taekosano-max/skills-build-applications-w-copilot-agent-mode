import mongoose from 'mongoose';
import { connectToDatabase, mongoUri } from '../config/database';
import { User, Team, Activity, LeaderboardEntry, Workout } from '../models';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  await connectToDatabase();
  console.log(`Connected to MongoDB for seeding at ${mongoUri}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Chen',
      email: 'ava.chen@example.com',
      fitnessLevel: 'Advanced',
      goals: ['Run a half marathon', 'Improve mobility'],
      location: 'Seattle',
      avatar: 'https://example.com/ava.png',
    },
    {
      name: 'Noah Patel',
      email: 'noah.patel@example.com',
      fitnessLevel: 'Intermediate',
      goals: ['Cycle 100 km', 'Build endurance'],
      location: 'Austin',
      avatar: 'https://example.com/noah.png',
    },
    {
      name: 'Mina Alvarez',
      email: 'mina.alvarez@example.com',
      fitnessLevel: 'Beginner',
      goals: ['Lose 5 kg', 'Start strength training'],
      location: 'Denver',
      avatar: 'https://example.com/mina.png',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Velocity Squad',
      sport: 'Running',
      members: [users[0]._id, users[1]._id],
      captain: users[0]._id,
      description: 'A high-energy team focused on speed and consistency.',
      isActive: true,
    },
    {
      name: 'Summit Riders',
      sport: 'Cycling',
      members: [users[1]._id, users[2]._id],
      captain: users[2]._id,
      description: 'A community of cyclists training for weekend challenges.',
      isActive: true,
    },
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'Run',
      title: 'Morning Tempo Run',
      durationMinutes: 35,
      calories: 420,
      distanceKm: 6.2,
      date: new Date('2026-07-01T06:30:00Z'),
    },
    {
      user: users[1]._id,
      type: 'Cycle',
      title: 'Hill Intervals',
      durationMinutes: 55,
      calories: 610,
      distanceKm: 20,
      date: new Date('2026-07-01T07:00:00Z'),
    },
    {
      user: users[2]._id,
      type: 'Strength',
      title: 'Full Body Strength',
      durationMinutes: 40,
      calories: 280,
      distanceKm: 0,
      date: new Date('2026-07-02T18:00:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      user: users[0]._id,
      points: 1420,
      streakDays: 12,
      wins: 4,
      rank: 1,
    },
    {
      user: users[1]._id,
      points: 1280,
      streakDays: 9,
      wins: 3,
      rank: 2,
    },
    {
      user: users[2]._id,
      points: 940,
      streakDays: 5,
      wins: 1,
      rank: 3,
    },
  ]);

  await Workout.insertMany([
    {
      name: 'Tempo Run Builder',
      category: 'Cardio',
      difficulty: 'Intermediate',
      durationMinutes: 30,
      focusAreas: ['Endurance', 'Speed'],
      equipment: ['Shoes'],
      description: 'A structured run designed to improve pacing and stamina.',
    },
    {
      name: 'Core Stability Flow',
      category: 'Mobility',
      difficulty: 'Beginner',
      durationMinutes: 20,
      focusAreas: ['Core', 'Flexibility'],
      equipment: ['Mat'],
      description: 'A short session to improve posture and balance.',
    },
    {
      name: 'Cycling Power Intervals',
      category: 'Cycling',
      difficulty: 'Advanced',
      durationMinutes: 45,
      focusAreas: ['Power', 'Endurance'],
      equipment: ['Bike'],
      description: 'Short intervals for athletes training for longer rides.',
    },
  ]);

  console.log('Seed data inserted successfully');

  await mongoose.disconnect();
};

seedDatabase().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
