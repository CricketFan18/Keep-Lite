import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/noteController.js';
import { authenticate } from '../config/auth.js';

const router = express.Router();
router.use(authenticate);

router.get('/', getNotes );

router.post('/create', createNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote );


export default router;