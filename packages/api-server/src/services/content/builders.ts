import { computeAssetCdnUrl } from '@sovereign-academy/content';
import { firstRow, getBuilderQuery } from '@sovereign-academy/database';
import { JoinedBuilder } from '@sovereign-academy/types';

import { Dependencies } from '../../dependencies';

export const createGetBuilders =
  (dependencies: Dependencies) => async (language?: string) => {
    const { postgres } = dependencies;

    const result = await postgres<JoinedBuilder[]>`
      SELECT
        r.id,
        r.path,
        bl.language,
        b.name,
        b.category,
        b.website_url,
        b.twitter_url,
        b.github_url,
        b.nostr,
        bl.description,
        r.last_updated,
        r.last_commit,
        ARRAY_AGG(t.name) AS tags
      FROM content.builders b
      JOIN content.resources r ON r.id = b.resource_id
      JOIN content.builders_localized bl ON bl.builder_id = b.resource_id
      LEFT JOIN content.resource_tags rt ON rt.resource_id = r.id
      LEFT JOIN content.tags t ON t.id = rt.tag_id
      ${language ? postgres`WHERE bl.language = ${language}` : postgres``}
      GROUP BY
        r.id,
        bl.language,
        b.name,
        b.category,
        b.website_url,
        b.twitter_url,
        b.github_url,
        b.nostr,
        bl.description
    `;

    return result.map((row) => ({
      ...row,
      logo: computeAssetCdnUrl(
        process.env['CDN_URL'] || 'http://localhost:8080',
        row.last_commit,
        row.path,
        'logo.jpeg'
      ),
    }));
  };

export const createGetBuilder =
  (dependencies: Dependencies) => async (id: number, language?: string) => {
    const { postgres } = dependencies;

    const builder = await postgres
      .exec(getBuilderQuery(id, language))
      .then(firstRow);

    if (builder) {
      return {
        ...builder,
        logo: computeAssetCdnUrl(
          process.env['CDN_URL'] || 'http://localhost:8080',
          builder.last_commit,
          builder.path,
          'logo.jpeg'
        ),
      };
    }

    return;
  };
