import React, { Children } from "react";
import classNames from 'classnames/bind'
import styles from './Navigate.module.scss'
type Props = {
    icon:JSX.Element,
    text:string,
};
const cx = classNames.bind(styles)
export default function NavigateMenu({icon,text}: Props) {
  return (
    <>
      <div className={cx('flex text-[15px] bg-low-gray w-[212px] p-[7px] hover:bg-main hover:text-white ')}>
        <div style={{marginRight:'20px'}}>{icon}</div>
        <div>{text}</div>
        <br/>
      </div>
    </>
  );
}

