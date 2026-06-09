import { Router } from 'express';
import mongoose from 'mongoose';
import { defaultPortfolio } from '../data/defaultPortfolio.js';
import { PortfolioProfile } from '../models/PortfolioProfile.js';

export const portfolioRouter = Router();

portfolioRouter.get('/', async (_request, response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return response.json({
        portfolio: defaultPortfolio,
        source: 'fallback'
      });
    }

    const profile = await PortfolioProfile.findOne().sort({ updatedAt: -1 }).lean();

    if (!profile) {
      return response.json({
        portfolio: defaultPortfolio,
        source: 'fallback'
      });
    }

    return response.json({
      portfolio: profile.content,
      source: 'mongodb'
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Unable to load portfolio content',
      error: error.message
    });
  }
});
