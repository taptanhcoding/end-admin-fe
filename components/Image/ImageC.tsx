import Image from 'next/image'
import React, { useState } from "react";


export default function ImageC({ ...props }) {
  let { src } = props;
  const [linkImg, setLinkImg] = useState(src);
  return <img  onError={() => {
    setLinkImg('/error.png')
    
  }} {...props} src={linkImg} />;
}
