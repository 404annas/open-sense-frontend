import Head from 'next/head';

const Description = ({ 
  description = "A film production company & creative agency", 
  url = typeof window !== 'undefined' ? window.location.href : '',
  image = "/og-image.jpg" // Default OG image - should be replaced with actual image
}) => {
  return (
    <Head>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content={description} />
    </Head>
  );
};

export default Description;