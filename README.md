[![Build Status](https://travis-ci.org/CartoonIsArt/blacky.svg?branch=master)](https://travis-ci.org/CartoonIsArt/blacky)

# 블래키  
밤 + 이브이 = 블래키  

## 개발순서  

0. 설치
1. 소스코드 최신화  
2. 브랜치 나누기  
3. 개발 후 테스트
4. 개인 브랜치에 커밋  
5. 마스터 브랜치 풀 리퀘스트  

### 0. 설치  

    $ git clone git://github.com/CartoonIsArt/blacky.git
    $ cd blacky
    $ yarn install

### 1. 소스코드 최신화  
소스코드를 마스터 브랜치에 맞게 최신화한다.  

    $ git pull origin master
    $ yarn install

### 2. 브랜치 나누기   
처음 브랜치를 나눌 때는 -b옵션을 사용한다.  

    $ git checkout [-b] "본인이름"

### 3. 개발 후 테스트  

    ...개발
    $ yarn run lint
    $ yarn test

문제가 없다면 4번으로  

### 4. 개인 브랜치에 커밋  

    $ git add [수정한 파일]
    $ git commit -m "커밋메시지"
    $ git push origin "본인이름"

### 5. 마스터 브랜치 풀 리퀘스트  

[본 깃헙](https://github.com/CartoonIsArt/blacky)에서 해당 브랜치의 풀 리퀘스트 버튼을 누른다.  
풀 리퀘스트를 작성하고 머지 리퀘스트를 보낸다.


## 트러블슈팅  

Q. 커밋을 실수했어요. 되돌리고 싶어요.  
A. [위키를 보세요](https://github.com/CartoonIsArt/blacky/wiki)  

Q. 커밋 메시지에 뭐라고 써야 하나요?  
A. 명령형의 짧고 간결한 문장이 좋습니다. [위키를 보세요.](https://github.com/CartoonIsArt/blacky/wiki)  
