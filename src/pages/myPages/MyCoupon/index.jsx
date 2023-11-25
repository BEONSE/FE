import styled from "styled-components";
import HaveCouponItem from "./HaveCouponItem";
import React, { useEffect, useState } from "react";
import BackMove from "../../../components/backMove";
import { ReqCouponList, ReqUsedCouponList } from "../../../apis/coupon";
import Loading from "../../../components/Loading";
import { CommonButton } from "../../../components/CommonButton";
import { usePageMoving } from "../../../components/usePageMoving";

const MyCoupon = () => {
  const { moveToBuyCoupon } = usePageMoving();
  // 필터 선택 state
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isCouponEmpty, setIsCouponEmpty] = useState(false);
  const [isUseEmpty, setIsUseEmpty] = useState(false);
  const [isCoupons, setIsCoupons] = useState([]);
  const [usedCoupons, setUsedCoupons] = useState([]);
  const [fullCount, setFullCount] = useState(0);
// 페이지
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState("");
  const loadMore = async () => {
    setIsLoading2(true);
    try {
      const couponsResponse = await ReqCouponList(page + 1);
      console.log(couponsResponse.data);
      if (couponsResponse.data.content.length === 0) {
        setIsCouponEmpty(true);
      } else {
        setIsCoupons([...isCoupons, ...couponsResponse.data.content]);
        setPageData(couponsResponse.data);
        setPage(page + 1);
      }
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading2(false);
    }
  };

  const loadMoreUsedCoupons = async () => {
    setIsLoading2(true);
    try {
      const usedCouponsResponse = await ReqUsedCouponList(page + 1);
      console.log(usedCouponsResponse.data);
      console.log("page", page);
      if (usedCouponsResponse.data.content.length === 0) {
        setIsUseEmpty(true);
      } else {
        setUsedCoupons([...usedCoupons, ...usedCouponsResponse.data.content]);
        setPageData(usedCouponsResponse.data);
        setPage(page + 1);
      }
    } catch (err) {
      // 오류 처리
    } finally {
      setIsLoading2(false);
    }
  };

  const throttle = (func, delay) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), delay);
      }
    };
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      // 스크롤이 맨 아래에 도달하면 새로운 데이터 로드
      if (selectedFilter === "no") {
        loadMore();
      } else if (selectedFilter === "yes") {
        loadMoreUsedCoupons();
      }
    }
  };

  useEffect(() => {
    const handleScrollThrottle = throttle(handleScroll, 20); // 쓸데없이 많은 이벤트 호출을 방지하기 위한 스크롤 쓰로틀링

    window.addEventListener("scroll", handleScrollThrottle);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, [handleScroll]);
  // defalut로 보유 쿠폰 가져오기
  useEffect(() => {
    getUnusedCoupons();
  }, []);

  // 사용, 미사용 선택 시 가져오기
  useEffect(() => {
    if (selectedFilter === "no") {
      setIsUseEmpty(false);
      getUnusedCoupons();
    } else if (selectedFilter === "yes") {
      setIsCouponEmpty(false);
      getUsedCoupons();
    }
  }, [selectedFilter]);

  // 미사용 쿠폰 가져오기
  const getUnusedCoupons = async () => {
    setIsLoading(true);
    try {
      const couponsResponse = await ReqCouponList();
      console.log("쿠폰", couponsResponse);
      if (couponsResponse.status === 200) {
        setIsCoupons(couponsResponse.data.content);
        setFullCount(couponsResponse.data.totalRows);
      }
    } catch (err) {
      console.log("미사용쿠폰 에러 ", err);
      if (err.response.data.statusCode === 404) {
        setIsCouponEmpty(true);
      }
    } finally {
      setSelectedFilter("no");
      setIsLoading(false);
    }
  };
  // 사용 쿠폰 가져오기
  const getUsedCoupons = async () => {
    setIsLoading(true);
    try {
      const couponsResponse = await ReqUsedCouponList();
      console.log("사용쿠폰", couponsResponse);
      console.log("사용쿠폰", couponsResponse.data.content[0].branchName);
      if (couponsResponse.status === 200) {
        setUsedCoupons(couponsResponse.data.content);
      }
    } catch (err) {
      if (err.response.data.statusCode === 404) {
        setIsUseEmpty(!isUseEmpty);
      }
    } finally {
      setSelectedFilter("yes");
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackMove content={"홈으로"}/>
      <HaveCouponAllDiv>
        <h1>쿠폰 현황 조회</h1>

        <SelectBtn>
          <FilterSpan filter={selectedFilter === "no"} onClick={() => setSelectedFilter("no")}>
            미사용
          </FilterSpan>
          <FilterSpan
            used={true}
            filter={selectedFilter === "yes"}
            onClick={() => setSelectedFilter("yes")}
          >
            사용
          </FilterSpan>
          {selectedFilter === "no" && <CountBox>보유 {fullCount} 개</CountBox>}
        </SelectBtn>
        {(selectedFilter === "no" ? isCoupons : usedCoupons).map((coupon) => (
          <HaveCouponItem key={coupon.cid} coupon={coupon} selectedFilter={selectedFilter} />
        ))}
        <StateBox>
          {isCouponEmpty && (
            <>
              <p>보유 쿠폰이 없습니다.</p>
              <MoveBuy onClick={moveToBuyCoupon}>쿠폰 구매하러 가기 ~</MoveBuy>
            </>
          )}
          {isUseEmpty && <p>사용한 쿠폰이 없습니다.</p>}
        </StateBox>
      </HaveCouponAllDiv>
      <Load>
        {isLoading && (
          <>
            <Loading /> <p>불러오는 중...</p>
          </>
        )}
      </Load>
      <Load>
        {isLoading2 && page != pageData.totalPageNo && (
          <>
            <Loading /> <p>불러오는 중...</p>
          </>
        )}
      </Load>
    </>
  );
};
export default MyCoupon;

// 쿠폰 현황 전체 div
const HaveCouponAllDiv = styled.div`
  margin: auto;
  width: 90vw;

  & > h1 {
    text-align: center;
    margin-top: 4vh;
    margin-bottom: 4vh;
  }
`;

// filter 버튼 div
const SelectBtn = styled.div`
  margin-bottom: 4vh;
`;

// filter 버튼 span
const FilterSpan = styled.span`
  cursor: pointer;
  background-color: ${(props) => (props.filter ? "#ffee88" : "#e8e8e8")};
  padding: 12px;
  border-radius: 30px 0px 0px 30px;
  display: inline-block;
  width: 100px;
  text-align: center;
  ${(props) =>
          props.used &&
          `
    border-radius: 0px 30px 30px 0px;
`}
`;

// 로딩
const Load = styled.div`
  width: 90vw;
  text-align: center;
`;

// 쿠폰 보유 상태
const StateBox = styled.div`
  margin-bottom: 20px;

  & > p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 2vh;
  }
`;

// 쿠폰 구매하러가기 버튼
const MoveBuy = styled(CommonButton)`
  font-size: 18px;
`;

// 보유 쿠폰 수량
const CountBox = styled.div`
  margin-top: 2vh;
  font-size: 18px;
  text-align: right;
`;
