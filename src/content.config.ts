import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: z
		.object({
			title: z.string().min(1),
			dek: z.string().min(1),
			publishDate: z.coerce.date(),
			register: z.enum(['atlantic', 'gladwell', 'newyorker', 'mixed']),
			form: z.enum(['essay', 'profile', 'reportage', 'history', 'capstone']),
			wordTarget: z.number().int().positive(),
			draft: z.boolean().default(true),
			sources: z.array(z.string()).optional(),
			corrections: z
				.array(
					z.object({
						date: z.coerce.date(),
						note: z.string().min(1),
					}),
				)
				.optional(),
		})
		.superRefine((data, ctx) => {
			if (data.draft === false) {
				const now = new Date();
				const startOfTomorrow = new Date(now);
				startOfTomorrow.setHours(0, 0, 0, 0);
				startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
				if (data.publishDate.getTime() >= startOfTomorrow.getTime()) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['publishDate'],
						message: 'A non-draft post must have a publishDate of today or earlier.',
					});
				}
			}
		}),
});

export const collections = { posts };
