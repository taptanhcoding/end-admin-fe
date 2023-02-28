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
        setLinkImg("/error.png");
      }}
      width={100}
      height={100}
      alt=''
      loader={() => linkImg}
      loading="lazy"
      {...props}
      src={linkImg}
    />
  );
}
