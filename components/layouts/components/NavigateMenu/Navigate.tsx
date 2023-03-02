import React from "react";
import NavigateMenu from "./NavigateMenu";
import {
  BsHeadphones,
  BsPhone,
  BsWatch,
  BsApple,
} from "react-icons/bs";
import { GiBatteryPack, GiCharging } from "react-icons/gi";
import { MdOutlineSurroundSound } from "react-icons/md";
import { AiFillAndroid } from "react-icons/ai";
import classNames from "classnames/bind";
import styles from "./Navigate.module.scss";

interface Props {
  type: string;
}
const cx = classNames.bind(styles);
export default function Navigate({
  type,
}: {
  type: string;
}) {
  switch (type) {
    case "1":
      return(
        <div
          className={styles.dropdown1}
          style={{ marginTop: 20, marginLeft: 20 }}
        >
          <div className={styles.dropdowncontent1}>
            <a href="#" id="1"><NavigateMenu icon={<BsHeadphones />} text={"Tai nghe"} /></a>
            <a href="#" id="2"><NavigateMenu icon={<GiBatteryPack />} text={"Pin dự phòng"} /></a>
            <a href="#" id="3"><NavigateMenu icon={<GiCharging />} text={"Củ sạc,cáp"} /></a>
            <a href="#" id="4"><NavigateMenu icon={<MdOutlineSurroundSound />} text={"Âm thanh"} /></a>
            <a href="#" id="5"><NavigateMenu icon={<BsPhone />} text={"Ốp lưng, cường lực"} /></a>
            <a href="#" id="6"><NavigateMenu icon={<BsWatch />} text={"Thiết bị đeo"} /></a>
            <a href="#" id="7"><NavigateMenu icon={<BsApple />} text={"Bộ sạc nhanh Iphone"} /></a>
            <a href="#" id="8"><NavigateMenu
             icon={<AiFillAndroid />}
              text={"Bộ sạc nhanh Android"}
            /></a>
            <a href="#" id="9"><NavigateMenu icon={<BsPhone />} text={"Phụ kiện thông minh"} /></a>
          </div>
        </div>
      );
      break;
    case "2":
      return (
        <div
        className={styles.dropdown}
        style={{ marginTop: 20, marginLeft: 20 }}
      >
        <button className={styles.dropbtn}>Hello</button>
        <div className={styles.dropdowncontent}>
          <a href="#" id="1"><NavigateMenu icon={<BsHeadphones />} text={"Tai nghe"} /></a>
          <a href="#" id="2"><NavigateMenu icon={<GiBatteryPack />} text={"Pin dự phòng"} /></a>
          <a href="#" id="3"><NavigateMenu icon={<GiCharging />} text={"Củ sạc,cáp"} /></a>
          <a href="#" id="4"><NavigateMenu icon={<MdOutlineSurroundSound />} text={"Âm thanh"} /></a>
          <a href="#" id="5"><NavigateMenu icon={<BsPhone />} text={"Ốp lưng, cường lực"} /></a>
          <a href="#" id="6"><NavigateMenu icon={<BsWatch />} text={"Thiết bị đeo"} /></a>
          <a href="#" id="7"><NavigateMenu icon={<BsApple />} text={"Bộ sạc nhanh Iphone"} /></a>
          <a href="#" id="8"><NavigateMenu icon={<AiFillAndroid />} text={"Bộ sạc nhanh Android"}/></a>
          <a href="#" id="9"><NavigateMenu icon={<BsPhone />} text={"Phụ kiện thông minh"} /></a>
        </div>
      </div>
      );
      break;
    default:
      return <div>hello</div>;
      break;
  }
}
