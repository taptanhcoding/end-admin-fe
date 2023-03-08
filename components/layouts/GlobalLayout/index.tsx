import React from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavigateMenu from "../components/NavigateMenu/NavigateMenu";

interface Props {
  children: JSX.Element | string | JSX.Element[];
}

export default function GlobalLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <NavigateMenu/>
      <Footer />
    </>
  );
}
