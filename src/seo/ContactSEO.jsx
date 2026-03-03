import MetaTags from '../seo/MetaTags';

const ContactSEO = () => {
  return (
    <MetaTags
      title="Contact Us | Open Sense - Film Production Company & Creative Agency"
      description="Get in touch with Open Sense, a film production company & creative agency"
      keywords="contact, film production, creative agency, video production, branding, marketing, inquiry"
      url={typeof window !== 'undefined' ? window.location.href : 'https://www.opensenseproductions.com/contact'}
      image="/og-image-contact.jpg" // Placeholder - should be replaced with actual contact image
    />
  );
};

export default ContactSEO;