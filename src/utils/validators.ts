import { z } from 'zod';

export const Schemas = {
  // Auth
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم'),
  name: z
    .string()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .max(50, 'الاسم طويل جداً'),
  phone: z
    .string()
    .regex(/^[0-9+\-\s]{8,15}$/, 'رقم الهاتف غير صحيح')
    .optional(),
  // Login form
  loginForm: z.object({
    email:    z.string().min(1, 'البريد الإلكتروني مطلوب').email('غير صحيح'),
    password: z.string().min(1, 'كلمة المرور مطلوبة'),
  }),
  // Register form
  registerForm: z.object({
    name:            z.string().min(2, 'الاسم مطلوب'),
    email:           z.string().email('بريد غير صحيح'),
    password:        z.string().min(8, 'كلمة المرور 8 أحرف على الأقل'),
    confirmPassword: z.string(),
    organization:    z.string().optional(),
  }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'كلمات المرور غير متطابقة',
      path: ['confirmPassword'],
    }
  ),
  // Project form
  projectForm: z.object({
    name:        z.string().min(2, 'اسم المشروع مطلوب'),
    description: z.string().optional(),
    type:        z.enum(['gpr', 'ert', 'topographic', 'combined']),
    units:       z.enum(['metric', 'imperial']),
    coordinateSystem: z.enum(['WGS84', 'UTM']),
    resolution:  z.number().min(0.1).max(1),
  }),
} as const;

// ── Standalone schema exports (for direct import) ─────────────
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: z
    .string()
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
