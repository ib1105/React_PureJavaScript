import { formatRelativeDate } from './js/helpers.js';
import store from './js/store.js';

//const store = require("./js/store.js");
const TabType = {
    KEYWORD: 'KEYWORD',
    HISTORY: 'HISTORY'
}

const TabLabel = {
    [TabType.KEYWORD]: '추천 검색어',
    [TabType.HISTORY]: '최근검색어',
}


class App extends React.Component {
    constructor(){
        super();

        this.state = {
            searchKeyword: "",
            searchResult:[],
            submitted: false,
            selectedTab: TabType.KEYWORD,
            keywordList: [],
            historyList: [],
        }
    }

    componentDidMount(){
        const keywordList = store.getKeywordList();//store.get getKeywordList();
        const historyList = store.getHistoryList();
        this.setState({
            keywordList,
            historyList,
        });
    }

    handleChangeInput(event){ //react에서 이벤트를 처리해주는 함수는 "handle"로 시작한다.
        // this.state.searchKeyword = event.target.value;
        // this.forceUpdate();
        const searchKeyword = event.target.value;

        if(searchKeyword.length <= 0 && this.state.submitted){
            this.handleReset();
        }
        
        this.setState({ //클래스가 제공하는 setState 메소드를 통해서만 상태를 변경해야한다. "컴포넌트 상태를 변경하겠다" 라는 컴포넌트와의 약속
                        //이 메서드를 호출해야지 컴포넌트가 스스로 변경해야할 지를 판단할 수 있다.
                        //setState가 변경된 것을 감지하게 되면 render() 함수가 실행된다.
            searchKeyword
        });

    }

    handleSubmit(event){
        console.log(this.state.searchKeyword);
        event.preventDefault();
        this.search(this.state.searchKeyword);
    }

    search(searchKeyword){
        console.log("search", searchKeyword);
        const searchResult = store.search(searchKeyword);
        const historyList = store.getHistoryList();

        console.log("돌아옴",searchResult);
        this.setState({
            searchKeyword,
            searchResult,
            historyList,
            submitted: true
        
        }); //생성자의 state 객체는 2개다. searchResult 객체는 기존 객체에 Merge된다.
    }

    handleReset(event){
        this.setState({
            searchKeyword : "",
            submitted: false,
    
        }); //setState는 비동기로 진행된다. 그래서 밑의 this.state.searchKeyword는 여전히 값이 찍힌다.
        console.log('Reset1', this.state.searchKeyword);

        //이 밑의 방식으로 setState()를 호출하면 값이 변경된게 보장이 된다.(동기화가 된다.)
        // this.setState(() => {
        //     return {searchKeyword:""};
        // }, () => {
        //     console.log('Reset2', this.state.searchKeyword);
        // });
    }

    handleClickRemoveHistory(event, keyword){
        event.stopPropagation(); //event를 넘긴 이유는 event 내의 메서드를 실행 할 수도 있기 때문에 넘겨주었다.
        store.removeHistory(keyword);
        const historyList = store.getHistoryList();
        this.setState({historyList});//컴포넌트는 state가 바뀌었다는 것을 인지하고 render() 함수를 호출한다.
    }

    render(){
        let resetButton = null;
        
        if(this.state.searchKeyword.length > 0){
            resetButton =  <button type="reset" className="btn-reset"></button>
        }

        const keywordList = (
            <ul className="list">
                {this.state.keywordList.map((item, index) =>{
                    return (
                        <li key={item.id} onClick={() => this.search(item.keyword)}>
                            {/*key 쓰는 이유 : react는 이 키값을 가지고 어떤 자식 노드가 변경되었는지 찾아낼 수 있다. 이런 용도로 key를 넣었다.  */}
                            <span className="number">{index + 1}</span>
                            <span>{item.keyword}</span>
                        </li>
                    )    
                }
                
                )}
            </ul>
        )

        const historyList = (
            <ul className="list">
                {this.state.historyList.map(({id, keyword, date}) => {
                    return (
                        <li key={id} onClick={() => this.search(keyword)}>
                            <span>{keyword}</span>
                            <span className="date">{formatRelativeDate(date)}</span>
                            <button className="btn-remove" onClick={event => this.handleClickRemoveHistory(event, keyword)}></button>
                            {/* 위 버튼 해석 : event가 발생하면 해당event와 클릭한 keyword를 해당 메서드에 넘겨준다. */}
                        </li>
                    )
                }
                
                )}
            </ul>
        )

        const tabs = (
            <> 
            <ul className="tabs">
                {Object.values(TabType).map(tabType => {
                    return (
                        <li className={this.state.selectedTab === tabType ? "active" : ""}
                             key={tabType}
                            onClick={()=>this.setState({selectedTab: tabType})}
                        >
                            {TabLabel[tabType]}
                        </li>
                    )
                })}
            </ul>
            {this.state.selectedTab === TabType.KEYWORD && keywordList}
            {this.state.selectedTab === TabType.HISTORY && historyList}
            </>
        );

        const searchResult = (this.state.searchResult.length > 0 ? (
            <ul className="result">
                {this.state.searchResult.map(item =>{
                    return (
                        <li key={item.id}>
                            <img src={item.imageUrl} alt={item.name}/>
                            <p>{item.name}</p>
                        </li>
                    )
                })}
            </ul>
        ) : (
            <div className="empty-box">검색결과가 없습니다.</div>
        ))

        return (
            <>
            <header>
                <h2 className="container">검색</h2>
            </header>
            <div className="container">
                <form onSubmit={event => this.handleSubmit(event)}
                    onReset={() => this.handleReset()} //handleReset()은 딱히 event 객체가 필요가 없어서 안넘겨줌.
                > 
                    <input type="text" placeholder="검색어를 입력하세요" autoFocus value={this.state.searchKeyword}
                    onChange={event => this.handleChangeInput(event)}
                    />
                    {resetButton}
                    {/* {this.state.searchKeyword.length > 0 ? (
                        <button type="reset" class="btn-reset"></button>
                    ) : null}  이렇게 삼항 연산자로 {resetButton}을 대체할 수 있다.*/}
                    {/* {this.state.searchKeyword.length > 0 && (
                        <button type="reset" class="btn-reset"></button>
                    )} 이렇게 조건부 연산자로 {resetButton}을 대체할 수 있다.*/}
                </form>
                <div className="content">
                    {this.state.submitted ? searchResult : tabs}
                </div>
            </div>    
        </>
        );
    }
}

// const element = (
//     <>
//         <header>
//             <h2 className="container">검색</h2>
//         </header>
//         <div className="container">
//             <form id="search-form-view">
//                 <input type="text" placeholder="검색어를 입력하세요" autoFocus />
//                 <button type="reset" className="btn-reset"></button>
//             </form>
//         </div>    
//     </>
// ); //소괄호를 묶는 이유 : javascript 엔진이 자동을 세미콜론을 붙이는 것을 방지하기 위해 소괄호를 넣음. JSX 코드를 사용할 때 권장하는 방식
//JSX 자체는 위와 같이 html과 모양은 같지만 실제는 자바스크립트 표현식이기 때문에 차이가 있다. 그 차이 중 하나는 attribute 이름인데
//자바스크립트는 "class"처럼 소문자를 쓰지만 JSX는 카멜케이스를 사용한다(className). ex)onclick -> onClick
//class는 자바스크립트 예약어이기때문에 JSX는 className를 사용한다. 

// +react는 root노드가 하나 있어야 한다. 그래서 전체를 div로 감싸줬다. 이 div는 별로 의미가 없다. 그리고 <div> 를 <>로 바꿀 수 있다.

ReactDOM.render(<App />, document.querySelector("#app"));