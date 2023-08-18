////////////////////////////////////////////////////////////////
// Import
////////////////////////////////////////////////////////////////

import { z } from 'zod';

import { getAccountIdFromAccessToken } from '../../utils/access-token';

import {
    createGetMyFinishedChapterList,
    setChapterAsFinished
} from '../../services/users';

import {
    createTRPCRouter,
    protectedProcedure
} from '../../trpc';

////////////////////////////////////////////////////////////////
// Function : Get My Finished Chapter List
////////////////////////////////////////////////////////////////

const getMyFinishedChapterListProcedure = protectedProcedure
    .meta({
        openapi: {
            method: 'GET',
            path: '/content/courses/chapterfinished',
        },
    })
    .input(
        z.object({
            accessToken: z.string(),
        })
    )
    .output(z.any())
    .query(async ({ ctx, input }) =>
        createGetMyFinishedChapterList(ctx.dependencies)(
            input.accessToken
        )
    );

////////////////////////////////////////////////////////////////
// Function : Set Chapter As Finished Procedure
////////////////////////////////////////////////////////////////

const setChapterAsFinishedProcedure = protectedProcedure //TODO use secure Procedure
        .meta({
            openapi: {
                method: 'POST',
                path: `/content/courses/{courseId}/{language}/chapters/{chapterIndex}/chapterfinished`,
            },
        })
        .input(
            z.object({
                accessToken: z.string(),
                courseId: z.string(),
                language: z.string(),
                chapterIndex: z.string(),
            })
        )
        .output(z.any())
        .mutation(async ({ ctx, input }) => {
            const { dependencies } = ctx;

            const accountId = await getAccountIdFromAccessToken(dependencies)(
                input.accessToken
            );

            const result = setChapterAsFinished(dependencies)(
                accountId,
                input.courseId,
                Number(input.chapterIndex),
                input.language
            );

            return result;
        });

////////////////////////////////////////////////////////////////
// Export
////////////////////////////////////////////////////////////////

export const coursesInteractionsRouter = createTRPCRouter({
    getMyFinishedChapterList: getMyFinishedChapterListProcedure,
    setChapterAsFinished: setChapterAsFinishedProcedure,
});