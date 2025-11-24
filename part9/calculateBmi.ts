import {isNotNumber as isNotNumber} from "./utils/helper";
import {MultiplyValues} from "./utils/helper";

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if ((isNotNumber(args[2]) && isNotNumber(args[3]))) {
        throw new Error('Provided values were not numbers!');
    } else {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }
};

export function calculateBmi(height: number, weight: number): string {
    const bmi: number = weight / Math.pow(height / 100, 2);

    let result: string;
    switch (true) {
        case bmi < 16.0:
            result = "Underweight (Severe thinness)";
            break;
        case bmi >= 16.0 && bmi < 17.0:
            result = "Underweight (Moderate thinness)";
            break;
        case bmi >= 17.0 && bmi < 18.5:
            result = "Underweight (Mild thinness)";
            break;
        case bmi >= 18.5 && bmi < 25.0:
            result = "Normal range";
            break;
        case bmi >= 25.0 && bmi < 30.0:
            result = "Overweight (Pre-obese)";
            break;
        case bmi >= 30.0 && bmi < 35.0:
            result = "Obese (Class I)";
            break;
        case bmi >= 35.0 && bmi < 40.0:
            result = "Obese (Class II)";
            break;
        case bmi >= 40.0:
            result = "Obese (Class III)";
            break;
        default:
            result = "Invalid BMI";
    }
    return result;
}

if (require.main === module) {
    try {
        const {value1, value2} = parseArguments(process.argv);
        console.log(calculateBmi(value1, value2));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}