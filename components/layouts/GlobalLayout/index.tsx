import React from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {Provider} from'react-redux'
import store from '../../../redux/store'

interface Props {
  children: JSX.Element | string | JSX.Element[];
}

export default function GlobalLayout({ children }: Props) {
  return (
    <>
      <Provider store={store}>
        <Header />
        {children}
        <Footer />
      </Provider>
    </>
  );
}
