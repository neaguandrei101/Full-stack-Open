import z from "zod";

export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});