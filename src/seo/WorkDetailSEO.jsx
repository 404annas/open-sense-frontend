import { useSearchParams } from 'next/navigation';
import MetaTags from '../seo/MetaTags';

const WorkDetailSEO = ({ workItem }) => {
  if (!workItem) {
    return (
      <MetaTags
        title="Project Detail | Open Sense - Film Production Company & Creative Agency"
        description="A film production company & creative agency"
        keywords="project, work, film production, creative agency, video production"
        url={typeof window !== 'undefined' ? window.location.href : `https://www.opensenseproductions.com/work-detail`}
        image="/og-image-work-detail.jpg"
      />
    );
  }

  return (
    <MetaTags
      title={`${workItem.name} | Open Sense - Film Production Company & Creative Agency`}
      description={workItem.description.substring(0, 160) + (workItem.description.length > 160 ? '...' : '')}
      keywords={`project, ${workItem.name}, film production, creative agency, video production, ${workItem.categories.join(', ')}`}
      url={typeof window !== 'undefined' ? window.location.href : `https://www.opensenseproductions.com/work-detail`}
      image={workItem.media && workItem.media.length > 0 ? workItem.media[0].src : "/og-image-work-detail.jpg"}
    />
  );
};

export default WorkDetailSEO;