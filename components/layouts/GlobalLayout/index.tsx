import React, { useState, useEffect, Suspense ,lazy } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import ToTop from "../../ToTop/ToTop";
import Loading from "../../Loading/Loading";

interface Props {
  children: JSX.Element | string | JSX.Element[];
}

export default function GlobalLayout({ children }: Props) {
  const [showToTop, setShowToTop] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 600) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    };
  }, []);

  return (
    <Provider store={store}>
        <Header />
      <Suspense fallback={<Loading/>}>
        <div className="container relative">
          {children}
          {showToTop && <ToTop />}
        </div>
      </Suspense>
        <Footer />
    </Provider>
  );
}
