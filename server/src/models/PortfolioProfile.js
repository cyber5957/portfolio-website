import mongoose from 'mongoose';

const portfolioProfileSchema = new mongoose.Schema(
  {
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { timestamps: true }
);

export const PortfolioProfile = mongoose.model('PortfolioProfile', portfolioProfileSchema);
