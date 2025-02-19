import { firstRow, getTutorialQuery } from '@sovereign-academy/database';

import { Dependencies } from '../../dependencies';

export const createGetTutorial =
  (dependencies: Dependencies) => async (id: number, language: string) => {
    const { postgres } = dependencies;

    const tutorial = await postgres
      .exec(getTutorialQuery(id, language))
      .then(firstRow);

    return tutorial;
  };
