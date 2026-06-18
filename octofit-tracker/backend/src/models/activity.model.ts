import { model, Schema, Document, Types } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  workout: Types.ObjectId;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: Schema.Types.ObjectId, ref: 'Workout', required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: () => new Date() },
    notes: { type: String },
  },
  { timestamps: true }
);

export const ActivityModel = model<ActivityDocument>('Activity', activitySchema);
