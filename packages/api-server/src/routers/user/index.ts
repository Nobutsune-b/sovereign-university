////////////////////////////////////////////////////////////////
// Import
////////////////////////////////////////////////////////////////

import {
    createTRPCRouter,
    mergeTRPCRouters,
    protectedProcedure
} from '../../trpc';

import { signAccessToken } from '../../utils/access-token';

import { coursesInteractionsRouter } from './courses-interactions';

////////////////////////////////////////////////////////////////
// Router : User Router Standard
////////////////////////////////////////////////////////////////

const userRouterStandard = createTRPCRouter({
    getMe: protectedProcedure.query(({ ctx }) => {
        return {
            user: ctx.user,
            accessToken: signAccessToken(ctx.user),
            isLoggedIn: true,
        };
    }),
});

////////////////////////////////////////////////////////////////
// Export
////////////////////////////////////////////////////////////////

export const userRouter = mergeTRPCRouters(
    userRouterStandard,
    coursesInteractionsRouter
);
