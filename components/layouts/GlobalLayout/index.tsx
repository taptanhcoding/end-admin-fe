import React from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
interface Props {
  children: JSX.Element | string | JSX.Element[];
}

export default function GlobalLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
