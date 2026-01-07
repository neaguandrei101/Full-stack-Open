import express, {ErrorRequestHandler, NextFunction} from 'express';
import {Response, Request} from 'express';
import patientsService from '../services/patientsService';
import {newEntrySchema, NewPatientEntry, NonSensitivePatientEntry, PatientEntry} from "../types";
// import {toNewPatientEntry} from "../Utils";
import {z} from "zod";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    const entries: NonSensitivePatientEntry[] = patientsService.getPatients();
    res.send(entries);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {

    const addedEntry = patientsService.addPatient(
        req.body
    );
    res.json(addedEntry);
});

const errorMiddleware: ErrorRequestHandler = (error, _req, res, next) => {
    if (error instanceof z.ZodError) {
        res.status(400).json({error: error.issues});
    } else {
        next(error);
    }
};

router.use(errorMiddleware);

export default router;