import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/routes/Diagnoses';
import patientsRouter from './src/routes/Patients';

const app = express();
app.use(express.json());
app.use(cors()); // This allows all origins

const PORT = 3001;

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});