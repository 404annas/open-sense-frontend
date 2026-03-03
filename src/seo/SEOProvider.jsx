import DefaultSEO from './DefaultSEO';

const SEOProvider = ({ children }) => {
  return (
    <>
      <DefaultSEO />
      {children}
    </>
  );
};

export default SEOProvider;