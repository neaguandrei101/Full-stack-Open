import patientsEntries from '../../data/patients';

import {PatientEntry, NonSensitivePatientEntry} from '../types';

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

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    addPatient
};