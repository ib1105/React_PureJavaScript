import { delegate, on, qs, qsAll } from "../helpers.js";
import View from "./View.js";

export const TabType = {
    KEYWORD: 'KEYWORD',
    HISTORY: 'HISTORY'
}

export const TabLabel = {
    [TabType.KEYWORD]: '추천 검색어',
    [TabType.HISTORY]: '최근검색어',
}

export default class TabView extends View{
    constructor(){
        super(qs("#tab-view"));
        this.template = new Template();
        this.bindEvents();
    }

    bindEvents(){
        delegate(this.element, "click", "li", event => this.handleClick(event));
    }

    handleClick(event){
        const value = event.target.dataset.tab;

        this.emit("@change",{value});
    }

    show(selectedTab){
        this.element.innerHTML = this.template.getTabList();

        qsAll("li", this.element).forEach(li => {
            li.className = li.dataset.tab === selectedTab ? "active" : "";
        });

        super.show();
    }
}

class Template{
    getTabList(){
        return `
            <ul class="tabs">
                ${Object.values(TabType)
                    .map(tabType => ({tabType, tabLabel: TabLabel[tabType]})) //map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
                    .map(this._getTab)
                    .join("")}                    
            </ul>
        `;
    }

    _getTab({tabType, tabLabel}){
        return `
            <li data-tab="${tabType}">
            ${tabLabel}
            </li>
        `;

    }
}