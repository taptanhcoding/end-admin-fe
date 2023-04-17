import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import HeaderItem from "../HeaderItem/HeaderItem";
import { BiUserCircle } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import products from '../../../../../../redux/cart';
import { productInOrder } from '../../../../../../configs/product';
import { userState } from "../../../../../../configs/user";
import { logout } from "../../../../../../redux/customer";

const cx = classNames.bind(styles);

function NavCustomer({
  icon,
  title,
  link,
  cb
}: {
  icon: IconProp;
  title: JSX.Element | string;
  link: string;
}): JSX.Element {


  return (
    <Link
      href={link}
      className={cx(
        "flex flex-row items-center text-14  p-3 hover:bg-main hover:text-white"
      )}
      onClick={cb}
    >
      <FontAwesomeIcon icon={icon} className="w-[15px] h-[15ppx]"/>
      <p className={cx("ml-3")}>{title}</p>
    </Link>
  );
}

export default function AccountItem() {
  const dispatch = useDispatch()
  const userState = useSelector((state : {
    products: productInOrder[],
    user : userState
  }) => state.user)
  const [showMenuCustomer, setShowMenuCustomer] = useState<boolean>(false);
  const navMenu = {
    login: [
      {
        icon: faUser,
        title: "Thông tin",
        link: "/user/profile",
      },
      {
        icon: faArrowAltCircleRight,
        title: "Đăng xuất",
        link: "/user/login",
        onClick: () => {
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          dispatch(logout())
        }
      },
    ],
    unLogin: [
      {
        icon: faRightToBracket,
        title: "Đăng nhập",
        link: "/user/login",
      },
    ],
  };
  
  return (
    <Tippy
      // visible={true}
      placement="bottom-start"
      trigger="mouseenter"
      appendTo="parent"
      interactive={true}
      render={(attrs): JSX.Element => (
        <div className="box" tabIndex={-1} {...attrs}>
          <div className={cx("bg-white py-4 rounded-lg min-w-[200px]")}>
            {navMenu[userState.isLogin ? 'login' : 'unLogin'].map((value, index) => (
              <NavCustomer
                key={index}
                icon={value.icon}
                title={value.title}
                link={value.link}
                cb={value?.onClick}
              />
            ))}
          </div>
        </div>
      )}
    >
      <div>
        <HeaderItem
          onClick={() => {
            console.log("bắt");

            setShowMenuCustomer((prev) => !prev);
          }}
          link={"/"}
          type="link"
          quanity={null}
          icon={<BiUserCircle />}
          content={<p className={cx("hidden sp:inline-block text-[16px] leading-none")}>{userState.isLogin ? userState?.data?.fullname !== ' ' ? userState?.data?.fullname : userState?.data?.email : 'Tài khoản'}</p>}
        />
      </div>
    </Tippy>
  );
}
