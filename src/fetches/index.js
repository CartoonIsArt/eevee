const user1 = {
  id: 1,
  date_joined: '2017-02-05 05:10:13.768196+00:00',
  date_of_birth: '1999-11-11 03:00:00+00:00',
  department: '전자통신공학과',
  nFeeds: 3,
  commentsCount: 5,
  nLikes: 4,
  isActive: false,
  isContributer: false,
  isGraduate: false,
  isRegular: true,
  is_admin: false,
  is_staff: false,
  last_name: '16기 와아이',
  phone_number: '010-0000-0000',
  student_number: '2000000000',
  username: 'kswcia',
  image: {
    id: 1,
    // src: 'https://cia.kw.ac.kr/media/2462a3f1-9bb5-4758-9cbe-fcf7f33db668.png',
    src: 'https://avatars.githubusercontent.com/u/8765507?s=400&u=56caf9f6b2255647317e8896972b7e7004b59579&v=4',
    alt: 'kPanic.png',
  },
}

// export const 여러 개 하면 사라질 린트 규칙
// 서버와 연동하면 id 쓸거임
/* eslint-disable */
export const getFeed = id => ({
  id: 3,
  author: user1,
  text: '### 여름엠티 수요조사\n\n여름엠티 1차 수요조사 글입니다.\n\n1. 엠티를 언제가든 참가할 것이다.\n\n2. 엠티를 7월에 간다면 참가할 것이다.\n\n3. 엠티를 8월에 간다면 참가할 것이다.\n\n4. 기타\n\n1,2,3번은 번호로 댓글 남겨주시고 4번은 구체적으로 댓글로 남겨주시면 됩니다.\n불참은 댓글 달지 않아도 좋습니다.\n\n**현재 작성일 6/20 화요일 1차 수요조사는 6/25 일요일 자정까지 합니다.**',
  write_date: '2017-06-20T07:03:20.963737Z',
  isBlind: false,
  touch_date: '2017-06-23T13:14:53.579546Z',
  images: [
    {
      id: 2,
      // src: 'https://cia.kw.ac.kr/media/20c2603a-013e-4e24-a517-64ecc5e97007.jpg',
      src: 'https://avatars.githubusercontent.com/u/28249912?s=400&u=27f87d52634c36eaec9d1715e6e7f2924a1c6c04&v=4',
      alt: 'aaa.jpg',
    },
    {
      id: 3,
      // src: 'https://cia.kw.ac.kr/media/8c061e9e-0478-4772-aef9-ce6899fc7a92.jpg',
      src: 'https://avatars.githubusercontent.com/u/29831584?s=400&u=150413c16f6c1de35e683bcb82abdfa6d44206e6&v=4',
      alt: 'bbb.jpg',
    },
  ],
  comments: [],
  likedUsers: [],
})
/* eslint-enable */
