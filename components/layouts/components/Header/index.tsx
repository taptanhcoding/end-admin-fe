import React, { useEffect, useState } from "react";
import Logo from "../../../Logo/Logo";
import Search from "../../../Search/Search";
import HeaderItem from "./components/HeaderItem/HeaderItem";
import { BsTelephoneFill, BsCartDash } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react/headless";
import axiosClient from "../../../../library/axiosClient";
import AccountItem from "./components/AccountItem/AccountItem";
import { productInOrder } from "../../../../configs/product";
import { userData } from "../../../../configs/user";
import { login } from "../../../../redux/customer";
import { add } from "../../../../redux/cart";

const cx = classNames.bind(styles);
export default function Header() {
  const dispatch = useDispatch();
  const { cart, user } = useSelector(
    (state: { products: Array<productInOrder>; user: userData }) => ({
      cart: state.products,
      user: state.user,
    })
  );

  console.log(cart);

  let quanity = cart.reduce((pre, pr) => pre + pr.option.quanity, 0);
  const [userInfo, setUserInfo] = useState(null);
  let token: string | null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [isgetcart,setIsgetCart] = useState(false)

  useEffect(() => {
    async function getUserInfo() {
      const userRq = await axiosClient.get(`/api/customer/auth`);
      console.log(userRq);
      if (userRq.status && userRq.data) {
        dispatch(login({ data: userRq.data }));
      }
      if (!!token) {
        const cartRs = await axiosClient.get("/api/order/get");
        console.log(cartRs);
        if (cartRs.status) {
          dispatch(add({ data: cartRs.data.orderDetails }));
          setIsgetCart(true)
        }
      }
    }
    getUserInfo();
  }, [token]);
  useEffect(() => {
    async function updateCart() {
      if (!!token && isgetcart) {
        const rsCart = await axiosClient.patch("/api/order/update", {
          orderDetails: cart
        });
        console.log(rsCart);
      }
    }
    updateCart();
  }, [cart]);

  return (
    <>
      <Head>
        <meta name="description" content="Phụ kiện thông minh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          className={cx(
            "w-full grid grid-flow-col auto-cols-auto bg-main sticky top-0 z-[9999]"
          )}
        >
          <Logo
            className={cx("h-[60px] p-[7px] ")}
            logo={"/imgs/logo1.png"}
            name={"Smart device"}
          />
          <Search />
          <div className={cx("flex items-center")}>
            <HeaderItem
              link={"/cart/info"}
              type="link"
              quanity={quanity}
              icon={<BsCartDash />}
              content={
                <p
                  className={cx(
                    "hidden sp:inline-block text-[16px] leading-none"
                  )}
                >
                  Giỏ hàng
                </p>
              }
            />
            <div>
              <AccountItem />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
