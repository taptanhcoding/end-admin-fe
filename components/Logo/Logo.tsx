import React from 'react'
import classNames from 'classnames/bind'
import styles from '../layouts/components/Header/Header.module.scss'

const cx = classNames.bind(styles)
export default function Logo({...props}) {
  return (
    <div {...props}>
      <img src='https://choihay.vn/images/config/logo_o_1633145973.png' className={cx('hidden md:block')}/>
      <img src='https://choihay.vn/images/config/logo_mobile_1566548403.png' className={cx('block md:hidden')}/>
    </div>
  )
}
