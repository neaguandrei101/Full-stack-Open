import patientsEntries from '../../data/patients';
import {v1 as uuid} from 'uuid';


import {PatientEntry, NonSensitivePatientEntry, NewPatientEntry} from '../types';

const patients: PatientEntry[] = patientsEntries as PatientEntry[];

const getPatients = (): NonSensitivePatientEntry[] => {

    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        })
    );
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {

    const newPatientEntry: PatientEntry = {
        id: uuid(),
        ...entry
    };

    patientsEntries.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    addPatient
};