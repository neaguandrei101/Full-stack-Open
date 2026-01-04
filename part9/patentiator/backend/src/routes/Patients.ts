import express from 'express';
import {Response} from 'express';
import patientsService from '../services/patientsService';
import {NonSensitivePatientEntry} from "../types";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    const entries: NonSensitivePatientEntry[] = patientsService.getPatients();
    res.send(entries);
});

router.post('/', (_req, res) => {
    res.send("Saving a diagnosis!");
});

export default router;