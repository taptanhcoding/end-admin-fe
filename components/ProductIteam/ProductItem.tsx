import React from 'react'
import Link from 'next/link'
import ImageC from '../Image/ImageC'
import money from '../../library/formatMoney'
import classNames from 'classnames/bind'
import styles from './ProductItem.module.scss'

type Props = {
    data: {
        coverImageUrl : string,
        name: string,
        slug: string,
        price: number,
    }
}
const cx= classNames.bind(styles)
export default function ProductItem({data}:Props) {
  return (
    <Link href={`/san-pham/${data.slug}`} className={cx('wrapper','flex flex-row w-full hover:bg-low-gray p-2  hover:border border-low-gray ')}>
        <div className={cx('wrap-img', 'bg-white mx-4')}><ImageC className={cx('object-contain')} src={data.coverImageUrl}/></div>
        <div className={cx('product-text flex-1')}>
            <p className={cx('product-text_name text-13')}>{data.name}</p>
            <p className={cx('product-text_price text-13 text-main')}>{money(data.price)}</p>
        </div>
    </Link>
  )
}
