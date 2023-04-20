import React from "react";
import Header from "./components/Header.js"
import SearchForm from "./components/SearchForm.js";
import SearchResult from "./components/SearchResult.js";
import store from "./Store.js";
import Tabs, { TabType } from "./components/Tabs.js";
import KeywordList from "./components/KeywordList.js";
import HistoryList from "./components/HistoryList.js";

export default class App extends React.Component {
    constructor(){
        super();
        this.state={
            searchKeyword: "",
            searchResult: [],
            submitted: false,
            selectedTab: TabType.KEYWORD,
        }
    }

    search(searchKeyword){
        console.log('TODO search', searchKeyword);
        const searchResult = store.search(searchKeyword);

        this.setState({
            searchKeyword,
            searchResult,
            submitted : true,
        })
    }

    handleReset(){
        console.log('TODO handlereset');
        this.setState({
            searchKeyword: "",
            submitted: false,
            searchResult: [],
        });
    }

    handleChangeInput(searchKeyword){
        if(searchKeyword.length <= 0){
            this.handleReset();
        }
        this.setState({searchKeyword});
    }

    render(){
        const {searchKeyword, submitted, searchResult, selectedTab} = this.state;

        //JSX문법을 이용하여 Header 컴포넌트를 사용함. 이전에는 3줄을 사용했는데 지금은 한줄만 사용하였다. 이것을 추상화라고 한다.
        return (
        <>
            <Header title="검색"/>
            <div className="container">
                
                <SearchForm 
                value = {searchKeyword}
                onChange={(value) => this.handleChangeInput(value)}
                onSubmit={() => this.search(searchKeyword)}
                /* SearchForm은 검색어 입력부분만 담당하기 때문에 검색결과에 관한 것은 SearchForm 컴포넌트의 역할은 아니다.
                검색어를 입력하고 엔터를 입력했다는 것 까지만 SearchForm 컴포넌트가 담당하고 있다.
                그 이후의 로직은 부모컴포넌트인 App으로 전달해서 App이 다른 컴포넌트를 제어해서 처리하도록 위임해야한다.
                그런데 React컴포넌트가 외부와 통신할 수 있는 유일한 통로는 바로 "props" 객체이다.
                React에서는 부모에서 자식으로 전달하는 방식이 자연스러운 방식이다. 반면에 SearchForm에서는 엔터를 입력하면 
                Form이 제출되었다는 것을 부모인 App쪽으로 알려줘야한다. 부모에서 자식방향으로 데이터를 보내는 흐름과 
                어긋나보이는데, 이 것을 역전시키는 방법은 "props"에 콜백함수를 만드는 것이다.
                그래서 자식컴포넌트에서는 함수가 "props"로 전달되고 이걸 부모컴포넌트에 메세지를 전달할 수 있다.*/
                onReset={() => this.handleReset()}
                />
            <div className="content">
                {submitted ? 
                <SearchResult data={searchResult}/> : 
                <>
                    <Tabs selectedTab={selectedTab} onChange={(selectedTab) =>  this.setState({selectedTab})}/>
                    {/*(윗줄해석) 부모에서 자식으로 보낼 수도  있고, 자식에서 props로 함수를 호출하여 부모에게 통신을 할 수도 있다. */}
                    {selectedTab === TabType.KEYWORD && <KeywordList onClick={keyword => this.search(keyword)} />}
                    {selectedTab === TabType.HISTORY && <HistoryList onClick={keyword => this.search(keyword)} />}
                </>}
            </div>
            </div>
        </>
        );
    }
}