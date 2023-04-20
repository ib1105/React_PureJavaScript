import React from "react";
import List from './List.js';
import store from "../Store.js";

export default class KeywordList extends React.Component{
    constructor(){
        super();

        this.state={
            keywordList: [],
        }
    }

    componentDidMount(){ //렌더링 이후 즉시 실행되는 함수
        const keywordList = store.getKeywordList();
        this.setState({
            keywordList,
        });
    }

    render (){
        return (
            //List를 보면 data, onclick, randomItem을 받기 때문에 아래에 적절하게 적어준다.
            //onClick는 콜백함수다. renderItem은 renderProps 라고 칭한다.
            <List 
            data={this.state.keywordList} 
            onClick={this.props.onClick} //props를 사용하여 onClick 함수를 부모로 끌어올린다.
            hasIndex={true} // or 참일경우 "hasIndex" 이렇게만 적어도 된다.
            />
        )
    }
}