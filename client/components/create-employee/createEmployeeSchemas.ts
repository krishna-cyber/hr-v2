import { email, z } from 'zod';

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

const trimmedString = z.string().trim();

const numericString = z
  .string()
  .trim()
  .regex(/^\d+$/, 'Must contain digits only');

export const personalInfoSchema = z.object({
  firstname: trimmedString
    .min(2, 'First name must be at least 2 characters')
    .max(20, 'First name must be less than 20 characters'),
  middlename: trimmedString.optional(),
  lastname: trimmedString
    .min(2, 'Last name must be at least 2 characters')
    .max(20, 'Last name must be less than 20 characters'),

  email: email({ message: 'Invalid email address' }).trim(),
  dob: z
    .date({ error: 'Date of birth is required' })
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date',
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        return d <= today;
      },
      {
        message: 'Date of birth cannot be in the future',
      },
    ),

  gender: z.enum(['male', 'female', 'other'], {
    error: 'Please select gender',
  }),

  contact: numericString.length(10, 'Contact number must be exactly 10 digits'),
  emergencyContact: z.union([
    z.string().regex(/^\d{10}$/, 'Emergency contact must be exactly 10 digits'),
    z.literal(''),
  ]),
  emergencyContactRelation: trimmedString
    .min(2, 'Relationship must be at least 2 characters')
    .max(10, 'Relationship name must be less than 10 characters'),

  emergencyContactName: trimmedString
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be less than 30 characters'),

  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),

  address: trimmedString
    .min(1, 'Address is required')
    .max(30, 'Address is too long'),
});

export const employmentSchema = z.object({
  department: z.enum(
    [
      'QA',
      'AI/ML',
      'Full Stack Developer',
      'hr',
      'finance',
      'marketing',
      'sales',
      'operations',
      'other',
    ],
    {
      error: 'Please select a valid department',
    },
  ),

  employmentType: z.enum(
    ['full-time', 'part-time', 'contract', 'intern', 'probation'],
    {
      error: 'Please select employment type',
    },
  ),

  dateOfJoining: z.date({
    error: 'Date of joining is required',
  }),

  employmentStartDate: z.date({
    error: 'Employment start date is required',
  }),

  employmentStartAs: z.enum(
    ['full-time', 'part-time', 'contract', 'intern', 'probation'],
    {
      error: 'Please select employment type',
    },
  ),
  role: z.enum(['employee', 'hr', 'supervisor', 'admin', 'superAdmin'], {
    error: 'Please select role',
  }),
  employeeStatus: z.string().default('active'),
  terminatedDate: z.date().optional(),

  supervisorId: trimmedString.optional(),
  github: trimmedString.optional(),
  internshipDurationMonths: z.number().optional(),
  salary: z
    .number({
      error: 'Salary is required',
    })
    .gt(0, 'Salary must be greater than 0')
    .lt(500000, 'Salary must be less than 500000'),
  bankAccount: z
    .string()
    .trim()
    .min(3, 'Bank account must be at least 3 digits')
    .max(30, 'Bank account must be less than 30 digits'),
  bankName: trimmedString
    .min(2, 'Bank name must be at least 2 characters')
    .max(30, 'Bank name must be less than 30 characters'),
});

export const documentsSchema = z.object({
  citizenshipNumber: z
    .string()
    .min(5, 'Citizenship number must be at least 5 characters')
    .max(30, 'Citizenship number must be less than 30 characters')
    .regex(
      /^[0-9\/-]+$/,
      'Citizenship number can contain only numbers, hyphens, and slashes',
    ),

  panNumber: numericString
    .min(5, 'PAN number must be at least 5 digits')
    .max(30, 'PAN number must be less than 20 digits'),

  citizenshipFrontPhoto: z
    .instanceof(File)
    .refine((file: File) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .refine((file: File) => allowedImageTypes.includes(file.type), {
      message: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
    })
    .optional(),
  citizenshipBackPhoto: z
    .instanceof(File)
    .refine((file: File) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .refine((file: File) => allowedImageTypes.includes(file.type), {
      message: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
    })
    .optional(),
  panPhoto: z
    .instanceof(File)
    .refine((file: File) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .refine((file: File) => allowedImageTypes.includes(file.type), {
      message: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
    })
    .optional(),
  profilePhoto: z
    .instanceof(File)
    .refine((file: File) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .refine((file: File) => allowedImageTypes.includes(file.type), {
      message: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
    })
    .optional(),
  signaturePhoto: z
    .instanceof(File)
    .refine((file: File) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .refine((file: File) => allowedImageTypes.includes(file.type), {
      message: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
    })
    .optional(),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type EmploymentFormData = z.infer<typeof employmentSchema>;
export type DocumentsFormData = z.infer<typeof documentsSchema>;

export type EmployeeSignupData = PersonalInfoFormData &
  EmploymentFormData &
  DocumentsFormData;
