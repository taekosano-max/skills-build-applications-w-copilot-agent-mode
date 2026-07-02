"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
app.get('/api', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API is running',
        apiBaseUrl: getApiBaseUrl(),
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json({
        message: 'Users endpoint',
        users,
    });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find({}).populate('members').populate('captain').lean();
    res.json({
        message: 'Teams endpoint',
        teams,
    });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find({}).populate('user').lean();
    res.json({
        message: 'Activities endpoint',
        activities,
    });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).populate('user').sort({ rank: 1 }).lean();
    res.json({
        message: 'Leaderboard endpoint',
        leaderboard,
    });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json({
        message: 'Workouts endpoint',
        workouts,
    });
});
const startServer = async () => {
    await mongoose_1.default.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
    app.listen(port, () => {
        console.log(`Octofit API listening on http://localhost:${port}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start Octofit API', error);
    process.exit(1);
});
