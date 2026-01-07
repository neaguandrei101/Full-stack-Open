import express from 'express';
import {Response} from 'express';
import patientsService from '../services/patientsService';
import {NewPatientEntry, NonSensitivePatientEntry} from "../types";
import {toNewPatientEntry} from "../Utils";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    const entries: NonSensitivePatientEntry[] = patientsService.getPatients();
    res.send(entries);
});

router.post('/', (req, res) => {
    const entry: NewPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(
        entry
    );
    res.json(addedEntry);
});

export default router;