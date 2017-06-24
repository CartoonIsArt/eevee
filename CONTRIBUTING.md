# 블래키 개발하기  
밤동게 블래키를 개발하는 방법을 설명합니다.  

## 개발순서  

0. 설치
1. 소스코드 최신화  
2. 브랜치 나누기  
3. 개발 후 테스트
4. 개인 브랜치에 커밋  
5. 마스터 브랜치 풀 리퀘스트  

### 0. 설치  

    $ git clone https://github.com/CartoonIsArt/blacky.git
    $ cd blacky
    $ yarn install

### 1. 소스코드 최신화  
소스코드를 마스터 브랜치에 맞게 최신화한다.  
마스터브랜치가 바뀌었을 경우에만 하면 된다.  

    $ git pull origin master
    $ yarn install

### 2. 브랜치 나누기   
처음 브랜치를 나눌 때는 -b옵션을 사용한다.  

    $ git checkout -b 브랜치명

> 브랜치 이름은 각자 이름으로 해주세요.  

### 3. 개발 후 테스트  
기본 설정은 http://localhost:3000/ 입니다.  

    $ yarn start
    ...개발
    $ yarn run lint
    $ yarn test

문제가 없다면 4번으로  

### 4. 개인 브랜치에 커밋 / 푸시  

    $ git add 수정한파일
    $ git commit
    $ git push origin 브랜치명

#### 4.1. 커밋메시지 작성 규칙  
* 제목은 10단어 이내로 써주세요  
* 본문은 10단어 단위로 개행해주세요  
* 본문에는 '왜' 이렇게 변경했는지를 써주세요  

### 5. 풀리퀘스트  

[본 깃헙](https://github.com/CartoonIsArt/blacky)에서 해당 브랜치의 풀 리퀘스트 버튼을 누른다.  
풀리퀘스트를 작성하고 머지 리퀘스트를 보낸다.   

> Travis build success가 있어야 합니다.  
> 풀 리퀘스트는 컴포넌트 단위로 요청해주세요.  
> 소스가 성공적으로 머지되었다면, 브랜치를 지워도 좋습니다.  

## 내 브랜치에 다른 브랜치 합치기  
다른 브랜치에서 개발중인 소스를 내 브랜치에 머지해야 할 경우가 있다.  
내 브랜치로 `checkout`을 하고, 해당 브랜치를 `git pull`명령어로 머지하면 된다.  

    $ git checkout mine
    $ git pull origin others

## 트러블슈팅  

Q. 아 린트 깜박함;;  
A. 린트하시고, `git commit --amend`로 합치세요
