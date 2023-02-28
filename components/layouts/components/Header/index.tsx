import React from 'react'
import Logo from '../../../Logo/Logo'
import Search from '../../../Search/Search'
import HeaderItem from '../../../HeaderItem/HeaderItem'
import {BsTelephoneFill} from 'react-icons/bs'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)
export default function Header() {
  return (
    <div className={cx('grid grid-flow-col auto-cols-auto bg-main')}>
    <Logo className={cx('h-[60px] p-[7px]')}/>
    <Search/>
    <div >
      <HeaderItem icon={<BsTelephoneFill/>} content="bán hàng"/>
    </div>
    </div>
  )
}
