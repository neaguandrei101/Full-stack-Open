function calculateBmi(height: number, weight: number): string {
    const bmi:number = weight / Math.pow(height / 100, 2);

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

console.log(calculateBmi(180, 74))