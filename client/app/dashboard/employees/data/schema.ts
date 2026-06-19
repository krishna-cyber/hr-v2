import { z } from 'zod';

const employeeStatusSchema = z.union([
  z.literal('active'),
  z.literal('onLeave'),
  z.literal('terminated'),
  z.literal('noticePeriod'),
  z.literal('resigned'),
  z.literal('work_from_home'),
]);
export type EmployeeStatus = z.infer<typeof employeeStatusSchema>;

const employeeRoleSchema = z.union([
  z.literal('superAdmin'),
  z.literal('admin'),
  z.literal('hr'),
  z.literal('supervisor'),
  z.literal('employee'),
]);

// Gender Schema
const genderSchema = z.enum(['male', 'female', 'other']);

// Blood Group Schema
const bloodGroupSchema = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

const _employeeSchema = z.object({
  _id: z.string(),

  dob: z.coerce.date(),
  gender: genderSchema,

  contact: z.string(),
  emergencyContact: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  emergencyContactName: z.string().optional(),

  bloodGroup: bloodGroupSchema.optional(),

  address: z.string(),
  employmentType: z.string(),
  department: z.string(),

  dateOfJoining: z.coerce.date().optional(),
  employmentStartDate: z.coerce.date(),
  employmentStartAs: z.string(),

  employeeStatus: employeeStatusSchema,

  salary: z.number(),

  bankAccount: z.string(),
  bankName: z.string(),

  panNumber: z.string(),
  citizenshipNumber: z.string(),

  citizenshipFrontPhoto: z.string().nullable().optional(),
  citizenshipBackPhoto: z.string().nullable().optional(),
  profilePhoto: z.string().nullable().optional(),
  panPhoto: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  signaturePhoto: z.string().nullable().optional(),

  internshipDurationMonths: z.number().nullable(),
  internshipEndingReminderSent: z.boolean(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Complete Employee Schema
export const employeeSchema = z.object({
  _id: z.string(),
  id: z.string(),

  name: z.string(),
  email: z.email(),

  emailVerified: z.boolean(),

  image: z.string().optional(),

  role: employeeRoleSchema,

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),

  employeeId: _employeeSchema.nullable(),
});

export type Employee = z.infer<typeof employeeSchema>;
