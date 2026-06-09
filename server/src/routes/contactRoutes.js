import { Router } from 'express';
import mongoose from 'mongoose';
import { ContactMessage } from '../models/ContactMessage.js';

export const contactRouter = Router();
const fallbackMessages = [];

contactRouter.post('/', async (request, response) => {
  const { name, email, message } = request.body ?? {};

  if (!name || !email || !message) {
    return response.status(400).json({
      message: 'Name, email, and message are required.'
    });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      await ContactMessage.create({ name, email, message });
    } else {
      fallbackMessages.push({
        name,
        email,
        message,
        createdAt: new Date().toISOString()
      });
    }

    return response.status(201).json({
      message: 'Thanks. Your message has been received.'
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Could not save the message right now.',
      error: error.message
    });
  }
});

contactRouter.get('/debug', (_request, response) => {
  response.json({
    fallbackMessages
  });
});
