import React from 'react'
import NavigateMenu from '../../components/layouts/components/NavigateMenu/NavigateMenu'
import {BsTelephoneFill} from "react-icons/bs"
export default function Products() {
  return (
    <div>
      <NavigateMenu icon={<BsTelephoneFill/>} text={"Tai nghe"} big={">"}/>
      <NavigateMenu icon={<BsTelephoneFill/>} text={"Pin dự phòng"} big={">"}/>
      <NavigateMenu icon={<BsTelephoneFill/>} text={"Tai nghe"} big={">"}/>
      <NavigateMenu icon={<BsTelephoneFill/>} text={"Tai nghe"} big={">"}/>
    </div>
  )
}
