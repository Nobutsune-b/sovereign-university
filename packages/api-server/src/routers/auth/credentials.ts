import { TRPCError } from '@trpc/server';
import { hash, verify as verifyHash } from 'argon2';
import { z } from 'zod';

import {
  addCredentialsUser,
  contributorIdExists,
  generateUniqueContributorId,
  getUserByAny,
} from '../../services/users';
import { createTRPCRouter, publicProcedure } from '../../trpc';
import { signAccessToken } from '../../utils/access-token';
import { contributorIdSchema } from '../../utils/validators';

const registerCredentialsSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
  email: z.string().email().optional(),
  contributor_id: contributorIdSchema.optional(),
});

const loginCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const credentialsAuthRouter = createTRPCRouter({
  register: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/auth/credentials' } })
    .input(registerCredentialsSchema)
    .output(
      z.object({
        status: z.number(),
        message: z.string(),
        user: z.object({ username: z.string(), email: z.string().optional() }),
        accessToken: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { dependencies } = ctx;
      const { postgres } = dependencies;

      if (await getUserByAny(postgres, { username: input.username })) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Username already exists',
        });
      }

      if (
        input.contributor_id &&
        (await contributorIdExists(postgres, input.contributor_id))
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Contributor ID already exists',
        });
      }

      const hashedPassword = await hash(input.password);
      const contributorId =
        input.contributor_id || (await generateUniqueContributorId(postgres));

      const [user] = await addCredentialsUser(postgres, {
        username: input.username,
        passwordHash: hashedPassword,
        contributorId,
        email: input.email,
      });

      return {
        status: 201,
        message: 'User created',
        user: { username: user.username, email: user.email ?? undefined },
        accessToken: signAccessToken(user),
      };
    }),
  login: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/auth/credentials/login' } })
    .input(loginCredentialsSchema)
    .output(
      z.object({
        status: z.number(),
        message: z.string(),
        user: z.object({ username: z.string(), email: z.string().optional() }),
        accessToken: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { dependencies } = ctx;
      const { postgres } = dependencies;

      const user = await getUserByAny(postgres, {
        username: input.username,
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      if (!user.password_hash) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This user has no password, try another login method',
        });
      }

      if (!(await verifyHash(user.password_hash, input.password))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      return {
        status: 200,
        message: 'Logged in',
        user: { username: user.username, email: user.email ?? undefined },
        accessToken: signAccessToken(user),
      };
    }),
});
