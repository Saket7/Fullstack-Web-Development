import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height) {
    res.status(400).send('Missing or wrong params');
  }

  // res.send(calculateBmi(height, weight))
  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target}: any = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ 
      error: "parameters missing"
    });
  }

  if (daily_exercises && target) {
    const result = calculateExercises(JSON.parse(daily_exercises), Number(target));
    console.log('result', result);
    return res.json(result);
  }

  return res.status(400).json({ 
    error: "malformatted parameters"
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});