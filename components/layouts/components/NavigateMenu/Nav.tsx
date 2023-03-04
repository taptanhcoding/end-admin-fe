import React from "react";
import Link from "next/link";
import classNames from 'classnames/bind'
import styles from './Nav.module.scss'
import {
  BsHeadphones,
  BsPhone,
  BsWatch,
  BsApple,
} from "react-icons/bs";
import { GiBatteryPack, GiCharging } from "react-icons/gi";
import { MdOutlineSurroundSound } from "react-icons/md";
import { AiFillAndroid } from "react-icons/ai";

interface MenuProps {
  type:string,
}
const items = [
  {
    slug: "/category1",
    icon: <BsHeadphones/>,
    name: "Tai nghe",
  },
  {
    slug: "/category2",
    icon: <GiBatteryPack/>,
    name: "Pin dự phòng ",
  },
  {
    slug: "/category3",
    icon: <GiCharging/>,
    name: "Củ sạc,cáp",
  },
  {
    slug: "/category4",
    icon: <MdOutlineSurroundSound/>,
    name: "Âm thanh",
  },
  {
    slug: "/category5",
    icon: <BsPhone/>,
    name: "Ốp lưng,cường lực",
  },
  {
    slug: "/category6",
    icon: <BsWatch/>,
    name: "Thiết bị đeo",
  },
  {
    slug: "/category7",
    icon: <BsApple/>,
    name: "Bộ sạc nhanh Iphone",
  },
  {
    slug: "/category8",
    icon: <AiFillAndroid/>,
    name: "Bộ sạc nhanh android",
  },
  {
    slug: "/category9",
    icon: <BsPhone/>,
    name: "Phụ kiện thông minh",
  },
];
const cx = classNames.bind(styles)
function NavigateMenu({icon,name,}:any) {
  return (
    <>
        <div className={cx('flex text-[15px] bg-low-gray w-[212px] p-[7px] hover:bg-main hover:text-white ')}>
        <span style={{marginRight:'20px'}}>{icon}</span>
        <span>{name}</span>
        <br/>
      </div>
      
    </>
  );
}
export default function  Menu({ type }:MenuProps){
  switch (type) {
    case '1':
      return <div className={styles.dropdowncontent1} >
      {items.map((item) => (
        <Link key={item.name} href={item.slug}  >
          <NavigateMenu key={item.name} icon={item.icon} name={item.name}/>
        </Link>
      ))}
      </div>
      break;
    case '2':
      return <>
      <button className={styles.dropdown}>DANH SÁCH SẢN PHẨM
      {items.map((item) => (
        <Link key={item.name} href={item.slug} className={styles.dropdowncontent2}>
          <NavigateMenu key={item.name} icon={item.icon} name={item.name}/>
        </Link>
      ))}
      </button>
      </>
      break;
    default:
      return <>
      <div>ERROR 404</div>
      </>
      break;
  }
}

