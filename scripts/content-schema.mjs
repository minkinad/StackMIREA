import { z } from 'zod';

export const githubAuthorSchema = z
  .string()
  .trim()
  .regex(/^(?:@?[A-Za-z0-9-]+|https:\/\/github\.com\/[A-Za-z0-9-]+\/?)$/);

export const docFrontmatterSchema = z
  .object({
	title: z.string().trim().min(1),
	description: z.string().trim().min(1),
	order: z.coerce.number().int().min(0).optional(),
	sidebar_position: z.coerce.number().int().min(0).optional(),
	author: githubAuthorSchema,
	slug: z.string().trim().optional()
  })
  .passthrough()
  .superRefine((data, ctx) => {
	if (data.order === undefined && data.sidebar_position === undefined) {
	  ctx.addIssue({
		code: z.ZodIssueCode.custom,
		message: "Either 'order' or 'sidebar_position' is required"
	  });
	}

	if (data.order !== undefined && data.sidebar_position !== undefined) {
	  ctx.addIssue({
		code: z.ZodIssueCode.custom,
		message: "Use only one of 'order' or 'sidebar_position'"
	});
  }
});

export function parseDocFrontmatter(rawFrontmatter) {
	return docFrontmatterSchema.safeParse(rawFrontmatter);
}
