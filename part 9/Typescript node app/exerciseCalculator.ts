interface ExercisesResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface RatingValues {
  rating: number
  ratingDescription: string
}

// interface MultiplyValues {
//   target: number;
//   timeDailyHours: number[];
// }

// const parseArguments = (args: Array<string>): MultiplyValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   const timeDailyHoursArgs = args.slice(3);

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       target: Number(args[2]),
//       timeDailyHours: timeDailyHoursArgs.map(dh => Number(dh))
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// };

const handleRatingValue = (targetDailyHours: number, average: number): RatingValues => {
  if (average < targetDailyHours) {
    return {rating: 3, ratingDescription: 'not to bad, but could be better'};
  } else if (average === targetDailyHours) {
    return {rating: 2, ratingDescription: 'good'};
  } else if (average > targetDailyHours) {
    return {rating: 1, ratingDescription: 'amazing'};
  }
  return {rating: 3, ratingDescription: 'not to bad, but could be better'};
};

export const calculateExercises = (timeDailyHours: number[], targetDailyHours: number): ExercisesResult => {
  const average: number = timeDailyHours.reduce((acc, curr) => acc += curr, 0) / timeDailyHours.length;
  const { rating, ratingDescription } = handleRatingValue(targetDailyHours, average);
  return {
    periodLength: timeDailyHours.length,
    trainingDays: timeDailyHours.filter(dh => dh > 0).length,
    success: targetDailyHours <= average / timeDailyHours.length,
    rating,
    ratingDescription,
    target: targetDailyHours,
    average
  };
};

// try {
//   const { target, timeDailyHours } = parseArguments(process.argv);
//   console.log(calculateExercises(timeDailyHours, target));
// } catch (e) {
//   if (e instanceof Error /*CustomError*/) {
//     console.log('Error, something bad happened, message: ', e.message);
//   }
// }

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
