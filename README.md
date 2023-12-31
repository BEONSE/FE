# 0. 팀

![image](https://github.com/BEONSE/FE/assets/66876922/f81ea2cf-416e-46ec-b330-30f521585e22)

# 1. 프로젝트 주제

모바일 쿠폰 서비스를 이용한 셀프 세차장 이용 웹사이트

# 2. 프로젝트 개요

## **1. 문제점**

셀프 세차장을 이용 시에는 회원 카드가 필수이다. 하지만 회원 카드를 깜빡하고 미 소지하고 갔을 경우 재발급 비용이 발생하게 되고, 회원 카드에 금액을 충전한 다음에 회원 카드로만 세차 시스템을 이용할 수 있다는 것에 불편함을 느끼게 되었다.

## **2. 해결 방안**

따라서 쿠폰 시스템을 도입하여 실물 회원 카드를 제거해 회원 카드 없이 세차장을 이용할 수 있게 하고, 예약 시스템을 통해 세차장 혼잡도를 확인해 불필요한 대기 시간을 감소 시키는 것으로 이 프로젝트를 기획하게 되었다.

# 3. 기술 스택
![image](https://github.com/BEONSE/FE/assets/66876922/720f204f-af41-4818-b968-770b9a70e95c)

# 4. 구현 범위

### [구매자]

- 구매자 권한의 회원 가입
- 구매자 정보 수정 (부분 수정 가능)
- 카테고리 별 제품 목록 확인
- 원하는 상품 장바구니 추가
- 장바구니 선택 삭제/전체 삭제
- 장바구니를 통해 원하는 제품 선택 결제 가능
- 결제 시 배송 메세지와 배송 정보, 선택한 제품 확인 가능
- 결제한 상품 주문 내역 확인

### [판매자]

- 판매자 권한의 회원 가입
- 판매자 정보 수정 (부분 수정 가능)
- 카테고리 별 상품 등록
- 등록 상품 정보 수정 (부분 수정 가능)
- 등록 상품 정보(이미지, 상품명, 카테고리, 가격, 재고 등) 출력
- 등록 상품 삭제
- 등록 제품 별 매출 및 판매 수량 확인
- 총 매출 및 판매 수량 확인
- 제품을 주문한 고객들의 정보 확인

### [일반회원]

- 회원가입 및 로그인, 로그아웃
- 가맹점 검색
- 가맹점 예약
- 리뷰 게시판
- 메이트 게시판
- 회원 정보 수정
- 내가 쓴 게시글 목록
- 쿠폰 구매/사용
- 포인트 충전

### [가맹점]

- 회원가입 및 로그인, 로그아웃
- 리뷰 모아보기
- 사용된 쿠폰 모아보기
- 가맹점 정보 수정

### [관리자]

- 가맹점 승인처리
- 전체 회원 조회
- 전체 결제 내역

# 5. 화면 구성

### [일반 회원]
![image](https://github.com/BEONSE/FE/assets/66876922/af4ce0da-9813-4bd2-835a-e567b833702d)

### [가맹점/관리자]
![image](https://github.com/BEONSE/FE/assets/66876922/ccef4fdc-a782-4e68-9435-bbe12c06ae8f)
