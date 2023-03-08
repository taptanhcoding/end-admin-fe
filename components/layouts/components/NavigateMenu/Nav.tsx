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
  const category = [
    {
      slug: "danh-sach/Tai-nghe",
      icon: <BsHeadphones/>,
      name: "Tai nghe",
    },
    {
      slug: "danh-sach/Pin-duPhong-cap",
      icon: <GiBatteryPack/>,
      name: "Pin dự phòng ",
    },
    {
      slug: "danh-sach/Cu-sac-cap",
      icon: <GiCharging/>,
      name: "Củ sạc,cáp",
    },
    {
      slug: "danh-sach/Am-thanh",
      icon: <MdOutlineSurroundSound/>,
      name: "Âm thanh",
    },
    {
      slug: "danh-sach/Oplung-cuongluc",
      icon: <BsPhone/>,
      name: "Ốp lưng,cường lực",
    },
    {
      slug: "danh-sach/Tb-deo",
      icon: <BsWatch/>,
      name: "Thiết bị đeo",
    },
    {
      slug: "danh-sach/Bo-sac-nhanh-IP",
      icon: <BsApple/>,
      name: "Bộ sạc nhanh Iphone",
    },
    {
      slug: "danh-sach/Bo-sac-nhanh-Adroid",
      icon: <AiFillAndroid/>,
      name: "Bộ sạc nhanh android",
    },
    {
      slug: "danh-sach/Phu-kien",
      icon: <BsPhone/>,
      name: "Phụ kiện thông minh",
    },
  ];
  switch (type) {
    case '1':
      return <div className={styles.dropdowncontent1} >
      {category.map((item) => (
        <Link key={item.name} href={item.slug}  >
          <NavigateMenu key={item.name} icon={item.icon} name={item.name}/>
        </Link>
      ))}
      </div>
      break;
    case '2':
      return <>
      <button className={styles.dropdown}>DANH SÁCH SẢN PHẨM
      {category.map((item) => (
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

