import { model, Schema, Document, Types } from 'mongoose';

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  rank: number;
  totalPoints: number;
  weeklyScore: number;
  lastActive: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    weeklyScore: { type: Number, required: true },
    lastActive: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const LeaderboardModel = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
