# 블래키  
밤 + 이브이 = 블래키  

## 개발순서  

1. 소스코드 최신화  
2. 브랜치 나누기  
3. 개발 후 개인 브랜치에 커밋  
4. 마스터 브랜치 풀 리퀘스트  

### 1. 소스코드 최신화

    $ git clone git://github.com/CartoonIsArt/blacky.git
    $ cd blacky
    $ yarn install

2번으로

### 2. 브랜치 나누기   

    $ git checkout -b "본인이름"

3번으로

### 3. 개발 후 개인 브랜치에 커밋  

    ...소스코드 수정
    $ git add .
    $ git commit -m "커밋메시지"
    $ git push origin "본인이름"

버그가 없다면 4번으로  

### 4. 마스터 브랜치 풀 리퀘스트  

https://github.com/CartoonIsArt/blacky에서 해당 브랜치의 풀 리퀘스트 버튼을 누른다.  
풀 리퀘스트를 작성하고 머지 리퀘스트를 보낸다.
