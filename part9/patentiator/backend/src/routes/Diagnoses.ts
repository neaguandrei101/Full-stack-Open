import express from 'express';
import diagnosesService from '../services/diagnosesService';
import {DiagnosisEntry} from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
    const entries: DiagnosisEntry[] = diagnosesService.getEntries();
    res.send(entries);
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnosis!');
});

export default router;