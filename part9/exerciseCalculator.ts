import {isNotNumber as isNotNumber} from "./utils/helper";

export interface InputValues {
    target: number;
    days: Days;
}

const parseArguments = (args: string[]): InputValues => {
    if (args.length < 10) throw new Error('Not enough arguments');

    for (let i = 2; i < args.length; i++) {
        if (isNotNumber(args[i]))
            throw new Error('Provided values were not numbers!');
    }

    return {
        target: Number(args[2]),
        days: args.map((x, i, _arr) => {
            if (i < 3) return null;

            return Number(x);
        }).filter(x => x != null) as number[]
    };

};


interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

type Days = number[];

function calculateExercises(dailyHours: Days, target: number): Result {

    const avg = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(num => num > 0).length,
        success: avg >= target,
        rating: 2,
        ratingDescription: 'not too bad but could be better',
        target: target,
        average: avg
    } as Result;
}


try {
    const {target, days} = parseArguments(process.argv);

    console.log(calculateExercises(days, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}