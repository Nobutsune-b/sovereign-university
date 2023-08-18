////////////////////////////////////////////////////////////////
// Import
////////////////////////////////////////////////////////////////

import { sign } from 'jsonwebtoken';
import { decode } from 'base64url';
import { JwtAuthTokenPayload } from '@sovereign-academy/types';

import { getUserByAny } from '../services/users';

////////////////////////////////////////////////////////////////
// Function : Sign Access Token
////////////////////////////////////////////////////////////////

export const signAccessToken = (user: {
    username: string;
    email?: string | null;
    }) => {
    const payload: JwtAuthTokenPayload = {
        username: user.username,
        email: user.email || undefined,
    };

    return sign(payload, process.env['JWT_SECRET'] as string, {
        expiresIn: '12h',
    });
};

////////////////////////////////////////////////////////////////
// Function : Get Account Id From Access Token
////////////////////////////////////////////////////////////////

export const getAccountIdFromAccessToken =
    (dependencies: Dependencies) => async (accessToken: string) => {
        const { postgres } = dependencies;
        // TODO get username from accessToken
        const payload = JSON.parse(decode(accessToken.split(".")[1]));
        const username = payload.username;

        const user = await getUserByAny(
            postgres,
            {username : username}
        );

        if (!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid credentials',
            });
        }
        const account_id = user.id;
        return account_id;
};

