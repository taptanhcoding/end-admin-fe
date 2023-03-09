import React, { ReactElement, useEffect, useState }  from 'react'
import ProductCard from '../../components/ProductCard'
import { useRouter } from 'next/router';
import GlobalLayout from '../../components/layouts/GlobalLayout';
import axiosClient from '../../library/axiosClient';
import { productCart } from '../../configs/product';
import Menu from '../../components/NavMenu/NavMenu';

interface Props {
  category:[],
}
export default function Products() {
  const router = useRouter();
  const {slugCategory} = router.query
  const [listProducts,setListProducts] = useState<Array<productCart>>([])
  useEffect(() => {
    async function getProductsByCate() {
      const products = await axiosClient.get(`/api/products?category=tai-nghe`)
      setListProducts(products.data)
    }
    getProductsByCate()
  },[slugCategory])
  
  return( 
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly', width:'100%'}}> 
      {listProducts.map((item) => (
        <div key={item.name} >
          <ProductCard data={item}/>
        </div>
      ))}
      {/* <Pagination defaultCurrent={1} total={50} />; */}
    </div>
    
    )
    

}

Products.getLayout = function getLayout(page:ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>
}