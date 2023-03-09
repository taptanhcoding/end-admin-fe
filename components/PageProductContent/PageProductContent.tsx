import Head from 'next/head'
import React from 'react'
import { productCart } from '../../configs/product'
import ProductCard from '../ProductCard'
import classNames from 'classnames/bind'
import styles from './PageProductContent.module.scss'


interface Props {
    pageName: string,
    pageTitle : string,
    data : Array<productCart>
    handlePaging: any
}
const cx = classNames.bind(styles)
export default function PageProductContent({pageName,pageTitle,data,handlePaging}:Props) {
  return (
    <>
    <Head>
        <title>{pageTitle}</title>
    </Head>
    <main className={cx('container')}>
      {/* <div className={cx('header-content','bg-white text-3xl')}>CÓ <span className={cx('font-bold')}>{rsSearch.length}</span> SẢN PHẨM VỚI TỪ KHÓA: <span className={cx('font-bold uppercase' )}>{key}</span></div> */}
      <div className={cx('grid sm:grid-cols-2 sm:gap-2 sp:grid-cols-3 sp:gap-3 md:grid-cols-5 md:gap-5')}>
        {data.length == 0 ? "Không tìm thấy kết quả nào !" : 
          data.map((pr) => <ProductCard key={pr._id} data={pr}/>)
        }
      </div>
    </main>
    </>
  )
}
