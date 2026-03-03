import Head from 'next/head';

const MetaTags = ({ 
  title = "Open Sense - Film Production Company & Creative Agency", 
  description = "A film production company & creative agency", 
  keywords = "film production, creative agency, video production, branding, marketing",
  url = typeof window !== 'undefined' ? window.location.href : '',
  image = "/og-image.jpg" // Default OG image - should be replaced with actual image
}) => {
  return (
    <Head>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      
      {/* Twitter Meta Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content={title} />
      
      {/* Additional SEO Meta Tags */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default MetaTags;