# 이브이 개발하기  
CIA 동아리 웹 사이트 이브이 워크플로우입니다.

## 개발환경

* [Github Desktop](https://desktop.github.com/)
* [nodejs](https://nodejs.org/ko/)
* [Webstorm](https://www.jetbrains.com/webstorm/download/)

## 개발순서  

0. 설치
1. 소스코드 최신화  
2. 브랜치 나누기  
3. 개발 후 테스트
4. 개인 브랜치에 커밋  
5. 마스터 브랜치 풀 리퀘스트  

### 0. 설치  

소스코드를 처음 빌드할 때 따라야 하는 순서입니다.

#### yarn설치

windows powershell에서 다음 명령어를 실행합니다.

    $ npm i --global yarn

#### 프로젝트 클론

깃헙 데스크탑에서 클론 버튼을 누르고 https://github.com/CartoonIsArt/eevee를 클론합니다.

#### webstorm실행

webstorm을 실행하고 클론한 프로젝트 폴더를 오픈합니다.

#### 종속성 설치

windows powershell에서 프로젝트를 클론한 폴더로 경로로 이동하고 다음 명령어를 실행합니다.

    $ yarn install
    $ yarn start

완료! http://localhost:3000/ 에서 개발을 진행할 수 있습니다.


### 1. 소스코드 최신화  

소스코드를 마스터 브랜치에 맞게 최신화합니다.  
마스터브랜치가 바뀌었을 경우에만 하면 됩니다.  
깃헙 데스크탑을 켜고, fetch origin 버튼을 누릅니다.  
(중요) 본인 브랜치에서 merge master 버튼을 누릅니다.  

### 2. 브랜치 나누기   

깃헙 데스크탑에서 각자 이름으로 브랜치를 생성하고, 그 브랜치에서만 작업합니다.  

### 3. 개발 후 테스트  
기본 테스트 페이지는 http://localhost:3000/ 입니다.  

    $ yarn start
    ...개발
    $ yarn run lint
    $ yarn test

문제가 없다면 4번으로  

### 4. 개인 브랜치에 커밋 / 푸시  

깃헙 데스크탑에서 커밋메시지를 작성하고 푸시합니다.  

#### 4.1. 커밋메시지 작성 규칙  
* 제목은 10단어 이내로 써주세요  
* 본문은 10단어 단위로 개행해주세요  
* 본문에는 '왜' 이렇게 변경했는지를 써주세요  

### 5. 풀리퀘스트  

[본 깃헙](https://github.com/CartoonIsArt/blacky)에서 해당 브랜치의 풀 리퀘스트 버튼을 누릅니다.  

> Travis build success가 있어야 합니다.  
> 풀 리퀘스트는 스프린트 단위로 요청해주세요.  
> 소스가 성공적으로 머지되었다면, 브랜치를 지웁니다.
