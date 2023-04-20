import React from 'react';

const SearchForm = ({value, onChange, onSubmit, onReset}) => {
    //함수컴포넌트를 쓸 때 "const SearchForm = (props) => {" 에서 props객체를 해체문법 "const SearchForm = ({value, onChange, onSubmit, onReset}) => {"으로 쓰면 더 편하다.

    const handleSubmit = (event) =>{
        event.preventDefault();
        onSubmit();//props의 콜백함수를 호출한다.
    }

    const handleReset = () =>{
        onReset();
    }

    const handleChangeInput = (event) => {
        onChange( event.target.value);
    }    

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
        <input
            type="text"
            placeholder="검색어를 입력하세요"
            autoFocus
            value={value}
            onChange={handleChangeInput}
        />
        {value.length > 0 && (
            <button type = "reset" className="btn-reset"></button>
        )}    
    </form>
    );
}

export default SearchForm;

//리액트를 쓰기 때문에 입력한 값을 저장하고 있어야하는데, 그러려면 state가 필요하다. 그래서 함수 컴포넌트 보다는 클래스 컴포넌트로 만든다.
// export default class SearchForm extends React.Component{
//     constructor(){
//         super();

//         /*this.state={
//             searchKeyword: "",
//             //이 searchKeyword 같은 경우는 SearchForm 내부에서 관리하기 떄문에 외부에서 접근하거나 수정하는 방법은 올바른 방법이 아니다.
//             //이 전 요구사항들(vanilla, 2-react)을 보면 추천검색어, 최근검색어를 클릭하면 이 SearchForm 안의 input에 searchKeyword를 설정해야하는 요구사항이 있었다.
//             //이 SearchForm 외부에서는 컴포넌트 내부에 같여있는 상태를 변경할 수 없는 구조라 문제가 될 수 있다.
//             //이렇게 searchKeyword처럼 여러 컴포넌트가 지원하는 상황이 생기는데 이런 경우는 가장 가까운 부모컴포넌트로 state를 끌어올리는 방법이 있다.
//             //이 것을 state 끌어올리기 라고 말한다. 다른 컴포넌트에서도 searchKeyword를 사용할 수 있게 한다.
//         }*/
//     }

// }