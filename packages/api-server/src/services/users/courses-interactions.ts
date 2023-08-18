////////////////////////////////////////////////////////////////
// Import
////////////////////////////////////////////////////////////////

import { getAccountIdFromAccessToken } from '../../utils/access-token';

////////////////////////////////////////////////////////////////
// Function : Create Get My Finished Chapter List
////////////////////////////////////////////////////////////////

export const createGetMyFinishedChapterList = (dependencies: Dependencies) => async (
        accessToken: string
    ) => {
        const { postgres } = dependencies;

        const accountId = await getAccountIdFromAccessToken(dependencies)(
            accessToken
        );

        const result = await postgres<
            {
                accountId: number
            }[]
        >`
            SELECT *
            FROM users.chapter_finished
            WHERE account_id = ${accountId}
        `;

        return result;
};

////////////////////////////////////////////////////////////////
// Function : Set Chapter As Finished
////////////////////////////////////////////////////////////////

export const setChapterAsFinished = (dependencies: Dependencies) => async (
        accountId: number,
        courseId: string,
        chapterIndex: number,
        language: string
    ) => {
        const { postgres } = dependencies;

        const result = await postgres<
            {
                accountId: number,
                courseId: string,
                chapterIndex: number,
                language: string
            }[]
        >`
            INSERT INTO users.chapter_finished (
                account_id,
                course_id,
                chapter,
                language
            ) VALUES (
                ${accountId},
                ${courseId},
                ${chapterIndex},
                ${language}
            )
            RETURNING *;
        `;

        return result;
};
