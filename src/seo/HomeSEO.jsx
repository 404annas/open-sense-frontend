import MetaTags from '../seo/MetaTags';

const HomeSEO = () => {
  return (
    <MetaTags 
      title="Open Sense - Film Production Company & Creative Agency"
      description="A film production company & creative agency"
      keywords="film production, creative agency, video production, branding, marketing, creative solutions"
      url={typeof window !== 'undefined' ? window.location.href : 'https://www.opensense.com'}
      image="/og-image-home.jpg" // Placeholder - should be replaced with actual home image
    />
  );
};

export default HomeSEO;