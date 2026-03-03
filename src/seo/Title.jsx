import Head from 'next/head';

const Title = ({ title = "Open Sense - Film Production Company & Creative Agency" }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
    </Head>
  );
};

export default Title;