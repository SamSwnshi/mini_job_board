

import express from 'express';

import { 
    getInternships, 
    createInternship, 
} from '../controllers/internship.controller.js';

const router = express.Router();

router.get('/', getInternships); 

router.post('/create',  createInternship);

export default router;