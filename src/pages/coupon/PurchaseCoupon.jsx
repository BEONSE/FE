import styled from "styled-components";
import { CommonButton } from "../../components/CommonButton";
import React, { useContext, useEffect, useState } from "react";
import MyPoints from "../myPages/myPoints";
import ModalPurchaseCoupon from "./ModalPurchaseCoupon";
import FormCoupon from "../../assets/formcoupon.png";
import PressCoupon from "../../assets/presscoupon.png";
import CouponStore from "../../assets/couponstore.png";
import BackMove from "../../components/backMove";
import AppContext from "../../AppContext";
import LoginModal from "../../components/LoginModal";
const PurchaseCoupon = () => {
  const appContext = useContext(AppContext);
  const [checkToken, setCheckToken] = useState(false);

  const pressPrice = 3000;
  const bubblePrice = 3000;
  const [press, setPress] = useState(1); // 고압 쿠폰 선택 수량
  const [bubble, setBubble] = useState(1); // 폼 쿠폰 선택 수량
  const [selectCoupon, setSelectCoupon] = useState({
    type: "",
    price: 0,
    quantity: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);

  // 수량 증가 handler
  const increasePressHandler = () => {
    setPress((prevCount) => (prevCount < 5 ? prevCount + 1 : prevCount));
  };
  const increaseBubbleHandler = () => {
    setBubble((prevCount) => (prevCount < 5 ? prevCount + 1 : prevCount));
  };

  // 수량 감소 handler
  const decreasePressHandler = () => {
    setPress((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  const decreaseBubbleHandler = () => {
    setBubble((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  // 구매 버튼 클릭
  const purchaseBtn = (couponType) => {
    if (appContext.accessToken) {
      if (couponType === "고압 샤워 쿠폰") {
        setSelectCoupon({
          type: couponType,
          price: pressPrice,
          quantity: press,
        });
      } else if (couponType === "폼 샤워 쿠폰") {
        setSelectCoupon({
          type: couponType,
          price: bubblePrice,
          quantity: bubble,
        });
      }
      setModalOpen(!modalOpen);
    } else {
      setCheckToken(!checkToken);
    }
  };

  useEffect(() => {
    console.log(press);
    console.log(bubble);
    console.log(selectCoupon);
  });

  return (
    <>
      <BackMove />
      <CouponAllDiv>
        <TopImg></TopImg>
        <GetPoints>
          <MyPoints />
        </GetPoints>
        <hr />
        <CouponItem>
          <img src={PressCoupon} alt="formCoupon" />
        </CouponItem>
        <QuantityAllDiv>
          <Quantity>
            <p>
              <span onClick={decreasePressHandler}>- </span>
              <span> {press} </span>
              <span onClick={increasePressHandler}> +</span>
            </p>
          </Quantity>
          <PurchaseBtn
            onClick={() => {
              purchaseBtn("고압 샤워 쿠폰");
            }}
          >
            구 매
          </PurchaseBtn>
        </QuantityAllDiv>
        <CouponItem>
          <img src={FormCoupon} alt="formCoupon" />
        </CouponItem>
        <QuantityAllDiv>
          <Quantity>
            <p>
              <span onClick={decreaseBubbleHandler}>- </span>
              <span> {bubble} </span>
              <span onClick={increaseBubbleHandler}> +</span>
            </p>
          </Quantity>
          <PurchaseBtn
            onClick={() => {
              purchaseBtn("폼 샤워 쿠폰");
            }}
          >
            구 매
          </PurchaseBtn>
        </QuantityAllDiv>
      </CouponAllDiv>
      {modalOpen && (
        <ModalPurchaseCoupon
          selectCoupon={selectCoupon}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          setPress={setPress}
        />
      )}
      {checkToken && <LoginModal setCheckToken={setCheckToken} checkToken={checkToken} />}
    </>
  );
};
export default PurchaseCoupon;

// StyledComponent

// 쿠폰 구매 전체 div
const CouponAllDiv = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > hr {
    width: 100%;
    margin-bottom: 2vh;
  }
`;

const TopImg = styled.div`
  background-image: url(${CouponStore});
  background-size: contain;
  width: 100vw;
  height: 112px;
  margin-top: 1vh;
  margin-bottom: 10px;
`;

// 쿠폰 정보
export const CouponItem = styled.div`
  & > img {
    width: 100%;
  }
`;
// 구매 수량 & 구매 버튼 div
const QuantityAllDiv = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

// 구매 수량 선택 div
const Quantity = styled.div`
  width: 20vw;
  text-align: center;
  & > p {
    font-size: 20px;
    font-weight: bold;
    margin: auto;
    & > span {
      cursor: pointer;
      margin-left: 2vw;
    }
  }
`;

// 구매 버튼
const PurchaseBtn = styled(CommonButton)`
  margin-top: 1vh;
  margin-bottom: 2vh;
  width: 25vw;
  font-size: 15px;
`;

const GetPoints = styled.div`
  width: 90vw;
  margin-top: 1vh;
  margin-bottom: 2vh;
`;
