import Image from "next/image";
import React, { useState } from "react";


interface propLoader {
  src: string,
  width: string | number,
  quality: number
}

export default function ImageC({ ...props }) {
  let { src } = props;
  const [linkImg, setLinkImg] = useState(src);
  
  return (
    <Image
      onError={() => {
        setLinkImg("/load.gif");
      }}
      width={100}
      height={100}
      alt=''
      loader={(e) => {
        return e.src
      }}
      loading="lazy"
      {...props}
      src={linkImg}
    />
  );
}
