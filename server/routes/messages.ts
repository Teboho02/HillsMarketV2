import express from 'express';
import {
  getMyConversations,
  getConversationMessages,
  sendMessage,
  createConversation,
} from '../controllers/messageController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.use(authenticateToken); // All message routes require authentication

router.get('/conversations', getMyConversations);
router.get('/conversations/:id/messages', getConversationMessages);
router.post('/conversations', createConversation);
router.post('/messages', sendMessage);

export default router;
