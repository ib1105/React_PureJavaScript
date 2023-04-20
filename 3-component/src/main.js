import ReactDOM  from "react-dom";
import App from "./App.js";
import React from "react";

console.log("main.js");

ReactDOM.render(<App/>, document.querySelector("#app")); //이렇게 하면 App 컴포넌트(<App/>)가 화면에 나올것이다.
//ReactDom은 App컴포넌트를 가지고 가상 DOM을 만들고, 이 것을 실제 DOM에다가 연결을 해야하느데 이 것을 index.html의 id인 app에 연결한다.