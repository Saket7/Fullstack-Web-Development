import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
  res.send('get a diagnose!');
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;