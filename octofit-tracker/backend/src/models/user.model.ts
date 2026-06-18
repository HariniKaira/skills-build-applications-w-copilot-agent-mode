import { model, Schema, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  team?: Types.ObjectId;
  joinedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'athlete' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);
