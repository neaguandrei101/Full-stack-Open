import express from 'express';

const app = express();
app.use(express.json());

import {calculateBmi} from "./calculateBmi";
import {calculateExercises, InputValues} from "./exerciseCalculator";

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res): void => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error("Bad query parameter");
    }

    res.send(calculateBmi(height, weight));
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!target || isNaN(Number(target))) {
        return res.status(400).send({error: 'target is not a number'});
    }
    if (!Array.isArray(daily_exercises)) {
        return res.status(400).send({error: 'daily_exercises is not an array'});
    }
    for (let i = 0; i < daily_exercises.length; i++) {
        if (isNaN(Number(daily_exercises[i]))) {
            return res.status(400).send({error: 'daily_exercises must contain only numbers'});
        }
    }

    const vals: InputValues = {target: target as number, days: daily_exercises as number[]};

    const result = calculateExercises(vals.days, vals.target);
    return res.send({result});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});