# Getting Started with Create React App

bootstrap CSS

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>
```

react bootstrap
https://react-bootstrap.github.io/

- 대문 jumbotron은 bootstrap v5, react-bootstrap v2 이상에서는 사용불가능

react bootstrap은 상단에 import로 해당 컴포넌트 불러와야 사용가능

```js
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
```

## 이미지폴더

1. src 폴더에 넣기: 파일명 변경 +압축됨
2. public 폴더에 넣기: 보존됨 / but, "절대경로/파일명.jpg"로 경로 작성해야함

## 절대경로 지정하기

- src를 기본경로로 세팅
  jsconfig.json 파일 생성 / 최상위폴더(root)에 추가해야함

```js
// jsconfig.json
{
  "compilerOptions": {
      "baseUrl": "src"
  },
  "include": [
      "src"
  ]
}
```

> 생성 후 vscode를 재실행하면 오류가 사라짐

## 파일쪼갤 때 활용 import/export

내보내기: export default 변수명  
가져오기: import 변수명 from 경로

- 보낼 변수가 많다면  
  export { 변수명1, 변수명2 }  
  가져오기: import { 변수명1, 변수명2 } from 경로

```js
var 변수이름 = "Kim";

export default 변수이름;
```

### data.js 가져와서 사용하기

data를 별도의 파일 안에 작성 후 저장  
App.js 상단에 import 해서 가져온 후에 useState 사용해서 데이터 바인딩하기

```js
import { useState } from "react";
import Data from "./data.js";

function App() {
  let [shoes, shoes변경] = useState(Data);
}
```

## 상품레이아웃을 컴포넌트화 하고, data만큼 반복시키기

반복되는 레이아웃을 컴포넌트로 만들기

```js
let [shoes, shoes변경] = useState(Data);
  return (
    <div className="App">
      // 상단부분 생략
      <div className="container">
        <div className="row">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

function Card(){
  return (
    <div className="col-md-4">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
      <h4>{ shoes[0].title }</h4>
      <p>{ shoes[0].content } & { shoes[0].price }</p>
    </div>
  )
}
```

컴포넌트로 만들고 나면 컴포넌트 안에 있는 shoes라는 변수가 없다고 오류가 발생함

→ 부모 컴포넌트에 있는 state 변수를 자식 컴포넌트로 전송하기

- 자식컴포넌트 안에 state 변수를 사용하려면 props.변수명으로 사용하기

```js
let [shoes, shoes변경] = useState(Data);
  return (
    <div className="App">
      // 상단부분 생략
      <div className="container">
        <div className="row">
          <Card shoes={shoes} />
          <Card shoes={shoes} />
          <Card shoes={shoes} />
        </div>
      </div>
    </div>
  )
}

function Card(props){
  return (
    <div className="col-md-4">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
      <h4>{ props.shoes[0].title }</h4>
      <p>{ props.shoes[0].content } & { props.shoes[0].price }</p>
    </div>
  )
}
```

→ 각 컴포넌트에 다른 데이터 전송하기

- 각각 컴포넌트에 해당되는 데이터(오브젝트)만 전송되게 설정하고, card 컴포넌트에 작성한 데이터바인딩 방법 수정하기

```js
<div className="container">
  <div className="row">
    <Card shoes={shoes[0]} />
    <Card shoes={shoes[1]} />
    <Card shoes={shoes[3]} />
  </div>
</div>
```

```js
function Card(props) {
  return (
    <div className="col-md-4">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
    </div>
  );
}
```

→ 컴포넌트 반복문 돌리기

- map() 사용
- 안에 들어가는 파라미터(a,i)의미<br> a: array에 있는 하나하나의 데이터<Br> i: 1씩 증가하는 변수를 의미
- 컴포넌트를 반복문 돌리는 이유:
  - 항상 같은 갯수의 데이터라면 반복문을 돌릴 필요가 없지만, 데이터는 항상 달라지기때문에 반복문을 돌리는 것이 좋음
  - '데이터 갯수'만큼 HTML에 뿌려지기 때문에

```js
<div className="container">
  <div className="row">
    {
      shoes.map((a,i)=>{
        return <Card shoes={shoes[i]} key={i} />
      });
    }
  </div>
</div>
```

### 상품 이미지 데이터 바인딩하기

### 1. 하드코딩되어있는 부분에 변수를 넣어서 수정하기

텍스트 중간 수정: '문자' + 변수 + '문자'

```js
src 부분 변수사용-> {} 중괄호로 변경
<img src={ shoes 반복문 돌때마다 1.2.3으로 변하는 변수.jpg }>

// 부모 컴포넌트의 i 변수를 가져와서 사용
<img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg' }>

// 부모컴포넌트에서 자식컴포넌트로 state 전송
<div className="container">
  <div className="row">
    {
      shoes.map((a,i)=>{
        return <Card shoes={shoes[i]} i={i} key={i} />
      });
    }
  </div>
</div>
```

### 2. data.js에 이미지 주소 추가하기 (혼자서 응용해봤는데 되네...!)

- data.js에 이미지 src 추가

```js
// data.js
export default [
  {
    id: 0,
    src: "https://codingapple1.github.io/shop/shoes1.jpg",
    title: "White and Black",
    content: "Born in France",
    price: 120000,
  },

  {
    id: 1,
    src: "https://codingapple1.github.io/shop/shoes2.jpg",
    title: "Red Knit",
    content: "Born in Seoul",
    price: 110000,
  },

  {
    id: 2,
    src: "https://codingapple1.github.io/shop/shoes3.jpg",
    title: "Grey Yordan",
    content: "Born in the States",
    price: 130000,
  },
];
```

해당 컴포넌트 수정하기

```js
function Card(props) {
  return (
    <div className="col-md-4">
      <img src={props.shoes.src} alt="신발이미지" width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
    </div>
  );
}
```

### 컴포넌트 모듈화

별도의 컴포넌트로 작성후 App.js 폴더로 import 하기

```js
// Detail.js
import React from "react";

function Detail() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
            alt=""
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
```

```js
// App.js
import Detail from "./components/Detail.js";

<Detail />;
```

## 라우팅 (페이지 나누기)

ReactRouter 특징

- 페이지마다 다른 HTML 파일이 아님 (index.html 하나만 있음)
- HTML 내부의 내용을 갈아치워서 다른페이지처럼 보여주는 것

react-router-dom 라이브러리 이용

설치

```
npm install react-router-dom@5

yarn add react-router-dom@5
```

### react-router-dom 초기세팅

index.js에 BroswerRouter / HashRouter 가져와서 App 감싸기

```js
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

```js
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

|                         HashRouter                          |                       BrowserRouter                       |
| :---------------------------------------------------------: | :-------------------------------------------------------: |
|                      localhost:3000/#/                      |                      localhost:3000/                      |
|              라우팅 안전하게 할 수 있게 도와줌              | 라우팅을 리액티가 아니라 서버에게 요청할 수도 있어서 위험 |
| 사이트 주소 뒤에 #이 붙는데, # 뒤에 적는 것은 서버로 전달 X |       HTML5 history API를 활용해서 UI를 업데이트함        |
|                    정적인 페이지에 적함                     |                   동적인 페이지에 적합                    |
|                   검색엔진으로 읽지 못함                    |                  검색엔진이 읽을 수 있음                  |

### Route 만들기

App.js에 import 해오기

```js
import { Link, Route, Switch } from "react-router-dom";
```

Route 만들고, path 지정

HTML 보여주기

```js
<Route path="/">
  <div>메인페이지입니다</div>
</Route>
<Route path="/detail">
  <div>상세페이지입니다</div>
</Route>
```

컴포넌트 보여주기

```js
<Route path="/">
  <div>메인페이지입니다</div>
</Route>
<Route path="/detail" component={detail}>
  <div>상세페이지입니다</div>
</Route>
```

react-router는 매칭이 되는 것들을 다 보여주는데,
exact라는 속성 추가하면 경로가 정확히 일치할 때만 보여줌

```js
<Route exact path="/">
  <div>메인페이지입니다</div>
</Route>
<Route path="/detail" component={detail}>
  <div>상세페이지입니다</div>
</Route>
```

### Link 태그로 페이지 이동

페이지 이동버튼으로 바꾸길 원하는 메뉴들을 Link 태그로 감싸고, to 속성 이용하여 경로 적어주기

```js
<Link to="/경로"></Link>

// 예시
<Navbar>
  <Nav.Link> <Link to="/">Home</Link> </Nav.Link>
  <Nav.Link> <Link to="/detail">Detail</Link> </Nav.Link>
</Navbar>
```

> Link 태그 사용하려면, react-router-dom에서 불러와야함

```js
import { Link } from "react-router-dom";
```

### useHistory 사용해서 페이지 이동

페이지 이동함수 useHistory()사용

1. import로 useHistory 가져오기
2. let history라는 변수에 함수 저장하기
3. history에 저장된 여러 자료들 중 사용하고 싶은 함수로 기능 만들기

- 라이브러리 사용법은 찾아서 읽거나 검색해봐야함.

```js
import { useHistory } from 'react-router-dom'

function Detail(){

  let history = useHistory();
  return (
    // 뒤로가기 .goBack()
    <button className="btn" onClick={()=>{
      history.goBack()
    }}>뒤로가기</button>

    // 커스텀 페이지로 이동하기 .push('경로')
    <button className="btn" onClick={()=>{
      history.push('/order')
    }}>주문하기</button>
  )
}
```

### switch 컴포넌트

매치되는 Route들 모두 보여주지 말고, 맨 위의 Route 하나만 보여줌

```js
import { Router, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          메인페이지
        </Route>
        <Route path="/detail">
          <Detail />
        </Route>
        <Route path="/:id">
          <div>아무거나 입력했을 때 나오는 페이지</div>
        </Route>
      </Switch>
    </div>
  );
}
```

## 상세페이지 여러개 만들기..

상세페이지 컴포넌트에 데이터바인딩하기

부모 컴포넌트에서 자식 컴포넌트로 변수 전송

```js
// App.js

<Route path="/detail/:id">
  <Detail shoes={shoes} />
</Route>
```

```js
// Detail.js

function Detail(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="props.shoes[0].src" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[0].title}</h4>
          <p>{props.shoes[0].content}</p>
          <p>{props.shoes[0].price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
```

> Detail 컴포넌트에서 state를 만들지 않고, 부모 컴포넌트에서 가져오는 이유  
> 데이터는 항상 위에서 아래 방향으로 흘러야 함  
> 중요한 데이터는 가장 최상위 컴포넌트에서 다 가지고 있어야 함
> 그렇지 않으면 역방향으로 전달할 때 문제들이 생기기 때문.  
> <b>결론: state를 만들 땐 state를 필요로 하는 컴포넌트들 중에서 가장 최상위 컴포넌트에 보관하기
> </b>

## 상세페이지 여러개 만들기

/경로/상품0로 접속하면 0번째 상품의 상세페이지,  
/경로/상품1로 접속하면 1번째 상품의 상세페이지,  
/경로/상품2로 접속하면 2번째 상품의 상세페이지
로 이동하도록 만들기

URL 파라미터 문법을 이용하여 축약시켜서 만들기

```js
// App.js

function App() {
  return (
    <div>
      <Route path="/detail/:id">
        <Detail shoes={shoes} />
      </Route>
    </div>
  );
}
```

> :id  
> 아무 문자나 받겠다는 URL 작명법  
> 함수 파라미터처럼 자유롭게 작명가능  
> 파라미터는 2개 3개든 추가할 수 있음

detail 컴포넌트 수정하기 (useParams() Hook)

```js
// detail.js

import { useParams } from "react-router-dom";

function Detail(props) {
  let { id } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={props.shoes[id].src} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
```

### 자료 순서가 변경되면 상세페이지도 고장 남

→ 해결방법:
/:id자리에 입력한 값과 상품의 영구ID가 같은 { 상품 데이터 }를 찾아서 데이터 바인딩하기

```js
// detail.js

import { useParams } from "react-router-dom";

function Detail(props) {

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(fuction(상품){
    return 상품.id == id
  })

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={찾은상품.src}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
```

### 설명

find() : array 안에서 원하는 자료를 찾고싶을 때 사용

1. array 뒤에 붙일 수 있으며, 안에 콜백함수가 들어감
2. 콜백함수 내의 파라미터(상품)는 array 안에 있던 하나하나의 데이터를 의미
3. return 오른쪽에는 조건식을 작성, 참인 데이터만 새로운 변수에 저장해줌
4. 조건식: 현재 URL의 /:id에 적힌 값과 상품의 영구번호(상품.id)가 같은지 비교

> 실제 개발할 때는 그냥 서버에 id:0인 상품데이터를 Ajax으로 요청하는 경우가 많음
> find()가 아니라 ajax 요청하는 코드가 들어가고, 요청이 성공되면 {} 중괄호 안에 깔끔하게 상품데이터만 들어오게됨

## styled-components (=CSS in JS)

component가 많아지면 css 작성이 복잡해져서 사용함
class 선언없이 컴포넌트에 CSS를 직접 장착
CSS를 입혀놓은 컴포넌트

> 장점

1. 스타일 넣을 때 다른 파일이랑 컴포넌트명이 겹쳐도 전혀 CSS적으로 문제가 생기지 않음
2. 나중에 컴포넌트 스타일 수정을 원할 때 CSS가 아니라 컴포넌트 파일을 찾으면 돼서 수정이 편리함

사용 방법

1. div 만들기: styled.div, p 태그 만들기: styled.p 등
2. style.태그 뒤에 `` backtick 기호 이용해서 기본 스타일 넣어주기
3. 변수로 저장하면 컴포넌트가 만들어지고, 사용하고 싶은 곳에 넣어서 사용하면 됨

```js
import styled from "styled-components";

let 박스 = styled.div`
  padding: 20px;
`;
function App() {
  return <박스>박스만들기</박스>;
}
```

props로 스타일링하기 (비슷한 UI가 필요할 때)

- ${}: 문자를 생성하는 `` backtick 기호 안에서 쓸 수 있는 ES6문법, 문자 중간중간 함수나 변수를 넣고싶을 때 사용
- props.색상이라는 props 변수를 집어넣음
- 일반 텍스트를 전달: "" 따옴표 안에 작성
- 변수나 자료형을 담기: {} 중괄호 안에 작성

```js
import styled from "styled-components";

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function App() {
  return <제목 색상="blue">제목입니다요</제목>;
  return <제목 색상={"red"}>제목입니다요</제목>;
}
```

설치

```
npm install styled-components

yarn add styled-components
```

## SASS

## 오류...
