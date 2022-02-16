# (가제)고쿠마의 냉장고 레시피

> ### 냉장고 비워야 하는데... 이 재료로 할 수 있는 요리가 뭐가 있을까?

<br/>

## 프로젝트 구성 안내

## 1. 프로젝트 소개

### 기술 스택

| 포지션     | 기술 스택                                                        |
| ---------- | ---------------------------------------------------------------- |
| 프론트엔드 | JavaScript, React.js, Styled-components, Axios, React Router DOM |
| 백엔드     | Python, Flask, MySQL , Docker, SQLAlchemy, flask-restx(Swagger)  |
| 인공지능   | Python, TensorFlow, YOLOv5, Jupyter Notebook                     |

### 서비스 소개

> ### 냉장고에 있는 식재료 사진만으로 지금 당장 요리할 수 있는 음식 레시피를 소개해 드립니다.
>
> ---
>
> 퇴근 후 집에 돌아온 쿠마는 저녁 메뉴를 고르지 못한 채 냉장고를 열어보았다. 냉장고 안에는 요리되지 못한 다양한 식자재들이 널브러져 있다. 배는 고프고 마땅한 레시피도 떠오르지 않아 이러다가는 또 배달음식이나 시켜먹게될 운명...!! 쿠마는 이 연관성없는 식자재들로 어떤 요리를 할 수 있을지 궁금하여 대충 몇 가지 식자재들을 꺼내와 카메라로 사진을 찍어본다.  
> **쿠마는 이 사진속 식자재들로 만들 수 있는 음식 레시피를 알고싶다!**

### 서비스 대상

- 남녀노소 누구나
- 냉장고 비우기를 실천하고 싶은 사람들
- 내 냉장고에 어떤 재료가 있는지 잘 모르겠는 사람들

## 2. 프로젝트 기획 의도

**프로젝트 아이디어 동기**

- 최근 냉장고 비우기를 실천하는 미니멀리스트가 많아지고 있습니다.
- 코로나로 인해 집에 있는 시간이 길어지면서 집에서 요리를 해먹는 시간이 많아져 계속 장을 보지만, 잘 쓰지않게 되는 재료들이 점점 늘어납니다.
- 기존 서비스들은 일일이 재료들을 입력하는 수고로움이 있었습니다. 따라서 사진 한번으로 내 냉장고 관리 및 레시피 추천을 해주는 서비스가 있으면 좋지 않을까라는 생각을 했습니다.

**프로젝트 목표**

- 기계학습, YOLO 객체 인식을 통해 사용자가 가지고 있는 사진만으로 음식을 인식하여 해당 음식들로 만들 수 있는 레시피를 추천해주는 서비스를 제공합니다.
- 인식된 재료를 통해 나의 냉장고를 관리할 수 있는 서비스를 제공합니다.

## 3. 서비스 주요 기능 설명

**서비스**
**메인 기능**

1. 냉장고에 있는 재료 사진을 기계학습, YOLO 객체 인식을 통해 재료를 인식하고 인식이 안된 재료들은 추가 입력하여 그 재료로 만들 수 있는 레시피를 추천해준다.
2. 재료 사진 인식 결과를 바탕으로 나의 냉장고를 만들어 관리할 수 있다.
3. 레시피 검색 기능을 만들고, 레시피를 검색했을 때 나의 냉장고에 있는 재료는 다른 색으로 표시한다.

**서브 기능**

1. 나의 레시피북(즐겨찾기 리스트)를 제공한다.
2. 나의 장보기 리스트를 제공한다.

**추가 기능**

- 레시피 중 굳이 필요 없는 재료 표시해주기
- 나의 냉장고 갤러리 공유하기
- 장볼때 얼마가 필요할지 예상해주기
- 추천된 레시피 외에 또 다른 추천 유튜브 영상 달아주기
- 나의 냉장고에서 남은 재료 중 대체 재료 알려주기

## 4. 프로젝트 구성도

- [와이어프레임]()

## 5. 프로젝트 팀원 역할 분담

| 이름   | 담당 업무                     |
| ------ | ----------------------------- |
| 백정하 | 인공지능 개발 / 백엔드 개발   |
| 이민영 | 팀장 / 프론트엔드 개발 / 기획 |
| 장서우 | 백엔드 개발 / 인공지능 개발   |
| 장훈   | 백엔드 개발 / 프론트엔드 개발 |
| 전현호 | 인공지능 개발 / 기획          |

**멤버별 responsibility**

1. 팀장/프론트엔드 담당

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성, 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 팀원간의 일정 등 조율 , 프론트엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정

2. 백엔드 담당

- 기획 단계: 데이터셋을 확보하기 위한 데이터베이스 구축, 데이터셋 수집
- 개발 단계: 데이터 베이스 구축 및 API 활용, 웹서비스 사용자의 정보 수집 기능 구현, 인공지능 학습 결과를 활용한 기능 구현
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

3. 인공지능 담당

- 기획 단계: 웹 서비스 프로젝트 주제에 맞는 모델 및 알고리즘 설정, 모델과 알고리즘에 적합한 데이터셋 수집
- 개발 단계: 데이터 전처리, 학습 모델 구현, 학습 데이터 가공 및 모델 정밀도 향상
- 수정 단계: 코치님 피드백 반영해서 인공지능 학습 방식 수정

## 6. 버전

- 1.0.0

## 7. FAQ

- 자주 받는 질문 정리

## 8. 로컬에서 프로젝트 실행 방법

### 리엑트 서드파티모듈 설치

`cd front && npm install && cd ..`

### docker-compose 실행

`docker-compose up -d`

- -d 옵션: 백그라운드 실행

### back서버에 접속하기(초기 데이터베이스 설정 목적)

`docker exec -it gokuma-back-1 /bin/bash` 또는 `docker exec -it gokuma-back-1 //bin//bash`

### 초기 데이터베이스에 값 넣기

`flask db upgrade`

- 위 명령어가 오류나면 아직 DB의 실행이 덜 끝나서 그러니, 잠시 뒤 한번 더 입력해주시면 됩니다.
- 위 명령어는 최초 1회만 실행해주시고, 이후에는 자동으로 db/data 폴더 내 자료가 저장됩니다.

### 웹페이지 접속해서 확인하기(80번 포트)

- localhost:80 에 접속해서 gokuma가 뜨는지 확인
- localhost:5000 에 접속해서 gokuma is the best! 가 뜨는지 확인

### 서버 종료 하기

`docker-compose down`

### 서버 삭제 하기

`docker rmi gokuma_front gokuma_back gokuma_db`

- 서버를 종료해야 삭제가 가능합니다.

<br/>

## 기타 명령어

### back(flask) 서버 cmd창 들어가기

`docker exec -it gokuma-back-1 /bin/bash` 또는 `docker exec -it gokuma-back-1 //bin//bash`

- #### 초기 데이터베이스에 값 넣기

  `flask db upgrade`

- #### 데이터베이스에 값 삭제하기
  `flask db downgrade`  
  위 명령어 한번 실행에 바로 직전 migration 하나가 취소됩니다.

### db 서버 cmd창 들어가기

`docker exec -it gokuma-db-1 /bin/bash` 또는 `docker exec -it gokuma-db-1 //bin//bash`

- #### mysql로 들어가기
  `mysql -u root -p`  
  password 입력(back > config에서 확인)

### 배포 하기

`docker-compose -f docker-compose.prod.yml up -d`

- 개발 서버 도커 이미지가 있다면 상단 서버 삭제하기 명령어를 통해 삭제 후 실행
