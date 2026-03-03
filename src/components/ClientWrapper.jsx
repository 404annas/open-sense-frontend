'use client';

import Navbar from "./Navbar";

const ClientWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ClientWrapper;