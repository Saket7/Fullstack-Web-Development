// import diaryData from '../../data/diaries';
import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry [] => {
//   return diaries.map(({ id, date, weather, visibility }) => ({
//     id,
//     date,
//     weather,
//     visibility,
//   }));
// };

// const addEntry = () => {
//   return null;
// };

export default {
  getEntries,
  // addEntry,
  // getNonSensitiveEntries
};