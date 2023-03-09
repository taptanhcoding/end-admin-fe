import React from 'react'
import classNames from 'classnames/bind'
import styles from '../layouts/components/Header/Header.module.scss'
import ImageC from '../Image/ImageC';
import Link from 'next/link';

interface props{
  logo: string,
  name: string,
  className:string;
}

const cx = classNames.bind(styles)
export default function Logo({logo,name}:props) {
  return (
    <Link href={'/'}>
      <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
      <ImageC src={logo}  className={cx(' md:block w-[80px] h-[74px] max-w-md')} />
      <div  className={cx('md:block md:w-[28px] md:hidden lg:block lg:w-[180px]  w-[0px] lg:text-[33px]  text-white font-serif')}>{name}</div>
      </div>
    </Link>
  )
}
