import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export const projectSchema = z.object({
  name: z.string().min(2, 'اسم المشروع يجب أن يكون حرفين على الأقل'),
  description: z.string().optional(),
  type: z.enum(['gpr', 'ert', 'topographic', 'combined']),
  coordinateSystem: z.enum(['WGS84', 'UTM']),
  units: z.enum(['metric', 'imperial']),
  resolution: z.number().positive('الدقة يجب أن تكون رقم موجب'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
