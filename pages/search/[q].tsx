import React, { ReactElement, useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import axiosClient from '../../library/axiosClient'
import { productCart } from '../../configs/product'
import classNames from 'classnames/bind'
import styles from './search.module.scss'
import Head from 'next/head'
import ProductCard from '../../components/ProductCard'

const cx = classNames.bind(styles)
export default function Search() {
  const router = useRouter()
  const { q,key } = router.query
  const [rsSearch,setRsSearch] = useState<Array<productCart>>([])
  useEffect(() => {
    async function searchWithKey() {
      const rs:{
        status: boolean,
        data: Array<productCart>
      } = await axiosClient.get(`/api/products?q=${key}`)
      let rsWkey = rs.data.map((vl) => ({...vl,key:vl.slug}))
      setRsSearch(rsWkey)
    }
    searchWithKey()
  },[key])
  
  return (
    <>
    <Head>
        <title>{key} -"Tìm kiếm"</title>
    </Head>
    <main className={cx('container')}>
      <div className={cx('header-content','bg-white text-3xl')}>CÓ <span className={cx('font-bold')}>{rsSearch.length}</span> SẢN PHẨM VỚI TỪ KHÓA: <span className={cx('font-bold uppercase' )}>{key}</span></div>
      <div className={cx('grid sm:grid-cols-2 sm:gap-2 sp:grid-cols-3 sp:gap-3 md:grid-cols-5 md:gap-5')}>
        {rsSearch.length == 0 ? "Không tìm thấy kết quả nào" : 
          rsSearch.map((pr) => <ProductCard key={pr._id} data={pr}/>)
        }
      </div>
    </main>
    </>
  )
}


