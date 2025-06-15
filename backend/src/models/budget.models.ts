import mongoose, { Document, Schema } from 'mongoose';

export interface IBudget extends Document {
  categoryId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  month: string; // Format: YYYY-MM
  createdAt: Date;
  updatedAt: Date;
}

const budgetSchema = new Schema<IBudget>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    month: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}$/, // YYYY-MM format
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one budget per category per month per user
budgetSchema.index({ userId: 1, categoryId: 1, month: 1 }, { unique: true });

export const Budget = mongoose.model<IBudget>('Budget', budgetSchema); 