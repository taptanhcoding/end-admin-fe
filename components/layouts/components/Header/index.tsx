import React from 'react'
import Logo from '../../../Logo/Logo'
import Search from '../../../Search/Search'
import HeaderItem from '../../../HeaderItem/HeaderItem'
import {BsTelephoneFill} from 'react-icons/bs'

export default function Header() {
  return (
    <>
    <Logo/>
    <Search/>
    <div >
      <HeaderItem icon={<BsTelephoneFill/>} content="bán hàng"/>
    </div>
    </>
  )
}
