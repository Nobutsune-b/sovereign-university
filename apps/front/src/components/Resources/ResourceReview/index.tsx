import { Card } from '../../../atoms/Card';
import { Contributor } from '../../Contributor';
import { ResourceRate } from '../ResourceRate';

interface ResourceReviewProps {
  comments: { content: string }[];
  contributor: {
    username: string;
    title?: string;
    image?: string;
  };
}

export const ResourceReview = ({ contributor }: ResourceReviewProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ResourceRate rate={4.2} />

      <Card>
        <div className="flex flex-row">
          <div className="mr-6">
            <Contributor contributor={contributor} />
          </div>

          <div className="flex flex-1 flex-col">
            <h5 className="mb-4 border-b border-solid border-gray-200 leading-tight">
              Best book to learn about Bitcoin
            </h5>
            <p className="line-clamp-4 text-ellipsis text-xs">
              Thanks to this, I have been able to complete a battle in my sixth
              novel and nearly write thirty pages in under three days. Thank you
              so much for this truly amazing mix!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
