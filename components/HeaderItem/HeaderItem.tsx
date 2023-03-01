import React from 'react'
import classNames from 'classnames/bind'
import styles from '../layouts/components/Header/Header.module.scss'

interface Props {
    icon: JSX.Element ,
    content: JSX.Element | string,
    type:string
}
const cx = classNames.bind(styles)
export default function HeaderItem({icon,content}:Props) {
  return (
    <div className={cx('sm:m-[26px] lg:m-[5px] m-[7px] md:flex')}>
      <div className={cx('lg:text-[36px] rounded-[12px] text-main bg-white p-[5px] sm:rounded-[24px]  md:text-[17px] md:text-main')}>{icon}</div>
      <div className={cx('text-white lg:text-[15px]  md:text-[8px]')}>{content}</div>
    </div>
  )
}
