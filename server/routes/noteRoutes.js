import express from 'express';
import { createNote, deleteNote, getNotes } from '../controllers/noteController.js';
import { authenticate } from '../config/auth.js';

const router = express.Router();
router.use(authenticate);

router.get('/', getNotes );

router.post('/create', createNote);

router.delete('/:id', deleteNote );

export default router;