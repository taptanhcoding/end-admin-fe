import React, { useEffect, useState } from "react";
import type {ReactElement} from 'react'
import { DebounceInput } from "react-debounce-input";
import Tippy from "@tippyjs/react/headless";
import { HiOutlineSearch } from "react-icons/hi";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import ProductIteam from "../ProductIteam";
import axiosClient from "../../library/axiosClient";

const cx = classNames.bind(styles);
export default function Search({ ...props }) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchRs,setSearchRs] = useState([])
  const [isShowRs,setShowRs] = useState<boolean>(false)
  useEffect(() => {
    if(searchValue !== '') {
      if(searchValue.trim() !== '') {
        setShowRs(true)
      }
      else {
      setShowRs(false)
      }
    }
    else {
      setShowRs(false)
    }
  },[searchValue])
  async function handleSearch(value:string) {
    try {
      const rsSearch = await axiosClient.get(`/api/products?q=${value}`)
      setSearchRs(rsSearch.data)
    } catch (error) {
      console.log("Lỗi tìm kiếm : ",error);
    }
  }
  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      delay={100}
      visible={isShowRs}
      onClickOutside={() => setShowRs(false)}
      render={(attrs) => (
        <div className="box" tabIndex={-1} {...attrs}>
          <div className={cx("flex py-2 md:w-144 sm:w-80 bg-white border border-low-gray ")}>
            {searchRs.length > 0 ? searchRs.map((data:{name: string,slug: string,price:number,coverImageUrl:string}):ReactElement => {
              return <ProductIteam key={data.slug} data={{
                name: data.name,
                slug: data.slug,
                price: data.price,
                coverImageUrl: `${process.env.NEXT_PUBLIC_API_URL}/${data.coverImageUrl}`
              }} />
            }) : "Không tìm thấy sản phẩm"}
            
          </div>
        </div>
      )}
    >
      <div className={cx("flex rounded md:w-144 sm:w-80  h-[40px] mt-[23px] bg-white p-4")}>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={(e) =>{
             setSearchValue(e.target.value)
              handleSearch(e.target.value)
            }}
          className={cx("flex-1 outline-0 bg-white text-[13px] italic mr-4")}
          onFocus={(e:any)=> {
            if(e.target.value !== '') {
              setShowRs(true)
            }
          }}
          placeholder='Tìm kiếm sản phẩm trên smart device ?'
        />
        <button>
          <HiOutlineSearch style={{
            fontSize: '1.8rem'
          }}/>
        </button>
      </div>
    </Tippy>
  );
}
