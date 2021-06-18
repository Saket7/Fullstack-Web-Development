// import diaryData from '../../data/diaries';
import patients from '../../data/patients';
// import { NonSensitivePatient, Patient, NewPatient, PublicPatient } from '../types';
import { Patient, NewPatient, PublicPatient } from '../types';
import {v1 as uuid} from 'uuid';
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const getNonSensitivePatient = (): PublicPatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatient,
  findById
};