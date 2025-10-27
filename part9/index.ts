import express from 'express';
const app = express();

import {calculateBmi} from "./calculateBmi";

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res): void => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(isNaN(height) || isNaN(weight)) {
        throw new Error("Bad query parameter");
    }

    res.send(calculateBmi(height, weight));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});