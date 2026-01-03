import diagnosesEntries from '../../data/diagnoses';

import {DiagnosisEntry} from '../types';

const diagnoses: DiagnosisEntry[] = diagnosesEntries;

const getEntries = (): DiagnosisEntry[] => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getEntries,
    addDiagnosis
};