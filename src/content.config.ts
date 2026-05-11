import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string().min(1),
		dek: z.string().min(1),
		publishDate: z.coerce.date(),
		sources: z.array(z.string()).optional(),
		corrections: z
			.array(
				z.object({
					date: z.coerce.date(),
					note: z.string().min(1),
				}),
			)
			.optional(),
	}),
});

export const collections = { posts };
