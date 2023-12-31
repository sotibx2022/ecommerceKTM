import React from 'react';
import {Header, Footer} from "../../components/index"
import "./AppLayout.css";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='childrenLayout'>{children}</div>
      <Footer />
    </>
  );
};

export default AppLayout;