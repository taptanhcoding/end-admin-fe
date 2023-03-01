import React from 'react'
import Logo from '../../../Logo/Logo'
import Search from '../../../Search/Search'
import HeaderItem from './HeaderItem/HeaderItem'
import {BsTelephoneFill,BsCartDash} from 'react-icons/bs'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'



const cx = classNames.bind(styles)
const logo1="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/329030659_1417820318956584_1663568495640829760_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=uv-zJll1gCoAX_bx4Gu&tn=DoiO9q6o7GFj9poR&_nc_ht=scontent.fhan14-2.fna&oh=03_AdSK3KWYegb7b-YGv04m2_dyjptVYPTBe9SJnvy-FJgMiQ&oe=64255146";
export default function Header() {
  return (
    <div className={cx('grid grid-flow-col auto-cols-auto bg-main')}>
    <Logo className={cx('h-[60px] p-[7px] ')} logo={logo1} name={'Smart device'}/>
    <Search/>
    <div  className={cx('flex items-center')}>
      <HeaderItem link={''} type='about' quanity={null} icon={<BsTelephoneFill width={'20px'} height={'20px'}/>} content={<>
        <p className={cx('text-[12px]')}>Bán hàng</p>
        <p className={cx('text-[16px] leading-none')}>Online</p>
      </>}/>
      <HeaderItem link={''} type='about' quanity={null} icon={<AiOutlineCheckCircle/>} content={<>
        <p className={cx('text-[12px]')}>Tra cứu</p>
        <p className={cx('text-[16px] leading-none')}>Bảo hành</p>
      </>}/>
      <HeaderItem link={'/'} type='link' quanity={0} icon={<BsCartDash/>} content="Giỏ hàng"/>
    </div>
    </div>
  )
}