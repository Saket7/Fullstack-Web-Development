import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatient());
  res.send('get a patients!');
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = toNewPatient(req.body);
    const addedNewPatient = patientsService.addPatient(newPatient);
    res.json(addedNewPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;