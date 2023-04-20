import React from "react";
//JSX모듈을 사용하는 경우 react를 import 해야한다.

const Header = (props) => { //재활용하기 위해서 props로 함수 인자를 받음
    return (
        <header>
            <h2 className="container">{props.title}</h2>

        </header>
    )
}

export default Header;