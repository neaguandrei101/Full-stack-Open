interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


interface Result {
    periodLength: 7;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

type Week = [number, number, number, number, number, number, number];

function calculateExercises(dailyHours: Week, target: number): Result {

    const avg = dailyHours.reduce((a, b) => a + b, 0) / 7;
    return {
        periodLength: 7,
        trainingDays: dailyHours.filter(num => num > 0).length,
        success: avg >= target,
        rating: 2,
        ratingDescription: 'not too bad but could be better',
        target: target,
        average: avg
    } as Result;
}

console.log(calculateExercises([3, 8, 2, 4.5, 0, 3, 1], 2));