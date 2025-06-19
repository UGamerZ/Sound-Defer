import React from "react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="left-2.5 hidden w-1/3 h-5/6 xl:block bg-[url(../public/bgs/1.jpg)] absolute " />
      <div className="right-2.5 hidden w-1/3 h-5/6 xl:block bg-[url(../public/bgs/2.jpg)] absolute" />
      <div className="left-2.5 hidden md:block w-1/4 h-5/6 xl:hidden bg-[url(../public/bgs/1.jpg)] absolute " />
      <div className="right-2.5 hidden md:block w-1/4 h-5/6 xl:hidden bg-[url(../public/bgs/2.jpg)] absolute" />
      {children}
    </>
  );
};

export default FormLayout;
