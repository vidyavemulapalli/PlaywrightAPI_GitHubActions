// sample zod schema
import { z } from 'zod';

export default z.object({
  page: z.number().int(),
  per_page: z.number().int(),
  total: z.number().int(),
  total_pages: z.number().int(),
  data: z.tuple([
    z.object({
      id: z.number().int(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    }),
    z.object({
      id: z.number().int(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    }),
    z.object({
      id: z.number().int(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    }),
    z.object({
      id: z.number().int(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    }),
    z.object({
      id: z.number().int(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    }),
    z.object({
      id: z.number().int(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.string(),
    }),
  ]),
  support: z.object({ url: z.string(), text: z.string() }),
});
