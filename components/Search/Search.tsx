import React, { useEffect, useState } from "react";
import type {ReactElement} from 'react'
import { DebounceInput } from "react-debounce-input";
import Tippy from "@tippyjs/react/headless";
import { HiOutlineSearch } from "react-icons/hi";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import ProductIteam from "../ProductIteam";
import axiosClient from "../../library/axiosClient";
import { useRouter } from 'next/router'


const cx = classNames.bind(styles);
export default function Search({ ...props }) {
  const router = useRouter()
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
      if(value) {
        const rsSearch = await axiosClient.get(`/api/products?q=${value}`)
        setSearchRs(rsSearch.data)
      }
    } catch (error) {
      console.log("Lỗi tìm kiếm : ",error);
    }
  }

  function navigateSearch() {
    if(searchValue) {
      router.push(`/search/tim-kiem?key=${searchValue}`)
    }
  }

  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      delay={100}
      visible={isShowRs}
      onClickOutside={() => setShowRs(false)}
      placement='bottom'
      render={(attrs) => (
        <div className="box" tabIndex={-1} {...attrs}>
          <div className={cx("wrap-result","flex flex-col py-2 md:w-144 sm:w-80 bg-white border border-low-gray max-h-[300px] overflow-y-scroll")}>
            {searchRs.length > 0 ? searchRs.map((data:{name: string,slug: string,price:number,coverImgUrl:string}):ReactElement => {
              return <ProductIteam key={data.slug} data={{
                name: data.name,
                slug: data.slug,
                price: data.price,
                coverImgUrl: `${process.env.NEXT_PUBLIC_API_URL}/${data.coverImgUrl}`
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
          onKeyDown={(e) => {
            if(e.key == 'Enter') {
            navigateSearch()
            setShowRs(false)
          } }}
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
          <HiOutlineSearch onClick={() => {
            navigateSearch()
            setShowRs(false)
          }} style={{
            fontSize: '1.8rem'
          }}/>
        </button>
      </div>
    </Tippy>
  );
}
