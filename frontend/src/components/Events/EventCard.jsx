import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  // ✅ Hooks must be at the top level, before any condition
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // ✅ Now it's safe to do the early return
  if (!data || typeof data !== "object" || !data.name) {
    return null;
  }

  const addToCartHandler = () => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

 return (
  <div
    className={`w-full block bg-white rounded-lg ${
      active ? "unset" : "mb-12"
    } lg:flex p-2`}
  >
    {/* ✅ Fixed image container width */}
    <div className="w-full lg:w-1/2 m-auto">
      <img src={`${data.images[0]?.url}`} alt="" />
    </div>

    {/* ✅ Fixed text container width */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center">
      <h2 className={`${styles.productTitle}`}>{data.name}</h2>

      <p>{data.description}</p>

      <div className="flex py-2 justify-between">
        <div className="flex">
          <h5 className="font-medium text-[18px] text-[#d55b45] pr-3 line-through">
            {data.originalPrice}$
          </h5>
          <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
            {data.discountPrice}$
          </h5>
        </div>
        <span className="pr-3 font-normal text-[17px] text-[#44a55e]">
          {data.sold_out} sold
        </span>
      </div>

      <CountDown data={data} />
      <br />

      <div className="flex items-center">
        <Link to={`/product/${data._id}?isEvent=true`}>
          <div className={`${styles.button} text-white`}>See Details</div>
        </Link>
        <div
          className={`${styles.button} text-white ml-5`}
          onClick={() => addToCartHandler(data)}
        >
          Add to cart
        </div>
      </div>
    </div>
  </div>
);

};

export default EventCard;
