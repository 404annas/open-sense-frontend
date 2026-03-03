import MetaTags from '../seo/MetaTags';

const PageSEO = ({ title, description, keywords, url, image }) => {
  return (
    <MetaTags 
      title={title || "Open Sense - Film Production Company & Creative Agency"}
      description={description || "A film production company & creative agency"}
      keywords={keywords || "film production, creative agency, video production, branding, marketing"}
      url={url || (typeof window !== 'undefined' ? window.location.href : '')}
      image={image || "/og-image-default.jpg"}
    />
  );
};

export default PageSEO;