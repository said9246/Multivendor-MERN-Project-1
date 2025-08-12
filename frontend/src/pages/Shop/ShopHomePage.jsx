import React from 'react'
import styles from '../../styles/styles'
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import { useSelector } from 'react-redux';

const ShopHomePage = () => {

  const seller = useSelector((state) => state.seller);

  const isOwner = seller && seller.isSeller === true;
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
         <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
            <ShopInfo
             isOwner={isOwner} 
             />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={isOwner}             />
          </div>
         </div>
    </div>
  )
}

export default ShopHomePage