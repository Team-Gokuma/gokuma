# (가제)이술뭐지?

> **이전에 마셨던 그때 그 술 이름이 뭐였지?** <br>
> 특별한날 마셨던 그때 그 술. 어떤 술인지 사진으로 찾아드립니다!

## 프로젝트 구성 안내

## 1. 프로젝트 소개

### 기술 스택

| 포지션     | 기술 스택                                                        |
| ---------- | ---------------------------------------------------------------- |
| 프론트엔드 | JavaScript, React.js, Styled-components, Axios, React Router DOM |
| 백엔드     | Python, Flask, MySQL , Docker                                    |
| 인공지능   | Python, TensorFlow, YOLOv5, Jupyter Notebook                     |

### 서비스 소개

> 특별한 날 친구들과 와인 한잔, 양주 한잔 마시는 일이 생기면 병 사진을 찍어두곤 합니다. 나중에 그 때 먹은 술이 다시 먹고싶어서 찾아보면 이름도 프랑스어나 독일어 등 어려운 말로 되어있어 외우기도 어렵고, 찍어놓은 사진을 보아도 라벨이 안보이거나 알아보기 힘든 글씨체 때문에 쉽게 구분하기 어려운 경우가 있습니다. '이술뭐지'는 주류 이미지를 학습시켜 내가 가지고 있는 사진만으로 주종 구분 및 상세 정보를 확인하고 저장할 수 있는 서비스를 제공합니다.

## 2. 프로젝트 기획 의도

**프로젝트 아이디어 동기**<br>

- 특별한날 마시는 와인, 양주 등의 주류의 사진만으로 어떤 주류인지 판별할수 있었으면 좋겠다.
- 익숙하지 않은 주류들의 정보를 손쉽게 얻고싶다.
- 내가 마셔본 주류들 중 맘에 들었던 주류들을 기록해두고 다시 볼수 있도록 저장하고 싶다.

**프로젝트 목표**<br>

- 기계학습, YOLO 객체 인식을 통해 사용자가 가지고 있는 사진만으로 주종 구분 및 상세 정보를 확인하고 저장할 수 있는 서비스를 제공합니다.
  - 애주가인 사용자의 경우에는, 새로운 술의 정보를 얻을 수 있고 즐겨찾는 술 리스트를 저장할 수 있습니다.
  - 와인, 양주와 같은 술이 익숙하지 않은 사용자에게는 이미지만으로 손쉽게 주류의 정보를 얻을수 있으며, 마음에 들었던 주류들을 기록하고 저장할 수 있습니다.

## 3. 서비스 주요 기능 설명

**서비스**
**메인 기능**

- 기계학습, YOLO 객체 인식을 통해 이미지로 원하는 주류를 찾아주는 서비스

**서브 기능**

- 사용자가 원하는 조건의 주류 검색하기 기능
- 추천 알고리즘을 통해 사용자의 취향에 맞는 주류 추천 서비스
- 사용자가 즐겨찾는 주류 리스트 만들기 서비스

## 4. 프로젝트 구성도

- [와이어프레임](https://whimsical.com/gokuma-2bWmzF2MiVEBtbqBFh1YPb)

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

- 프로젝트의 버전 기입

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

<br/><br/>

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
