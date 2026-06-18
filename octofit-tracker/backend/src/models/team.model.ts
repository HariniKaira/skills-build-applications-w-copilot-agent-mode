import { model, Schema, Document, Types } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  foundedAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    foundedAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const TeamModel = model<TeamDocument>('Team', teamSchema);
