import React, { ReactElement } from 'react'
import GlobalLayout from '../../components/layouts/GlobalLayout'

export default function Cart() {
  return (
    <>Thông tin đơn hàng</>
  )
}


Cart.getLayout = function getLayout(page :ReactElement) {
    return <GlobalLayout>{page}</GlobalLayout>
}