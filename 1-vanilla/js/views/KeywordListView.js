import { delegate, on, qs } from "../helpers.js";
import View from "./View.js";

export default class KeywordListView extends View{
    constructor(element = qs("#keyword-list-view"), template = new Template()) { //클래스 안에서 아무 것도 넣지 않으면 element와 template는 여기서 설정한 내용이 기본값으로 들어간다.
        //HistoryListView가 KeywordListView.js를 상속받기 떄문에 이렇게 사용한다.
        super(element);
        this.template = template;
        this.bindEvents();
    }

    bindEvents(){
        delegate(this.element, "click" , "li", event => this.handleClick(event));
    }

    handleClick(event){
        console.log("handleCleck", event.target.dataset.keyword);
        const value = event.target.dataset.keyword;
        this.emit("@click",{value});
    }

    show(data = []){
        this.element.innerHTML = data.length > 0 ? this.template.getList(data) : this.template.getEmptyMessage();
        super.show();
    }
}

class Template {
    getEmptyMessage(){
        return `<div class="empty-box">추천 검색어가 없습니다</div>`;
    }

    getList(data = []){
        return `
            <ul class="list">
                ${data.map(this._getItem).join("")}
            </ul>
        `;

    }

    _getItem({id, keyword}){
        return `
            <li data-keyword="${keyword}">
                <span class="number">${id}</span>
                ${keyword}
            </li>
        `;
    }
}