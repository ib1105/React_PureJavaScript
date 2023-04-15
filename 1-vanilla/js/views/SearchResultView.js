import { on, qs } from "../helpers.js";
import View from "./View.js";


export default class SearchResultView extends View{
    constructor(){
        super(qs("#search-result-view"));

        this.template = new Template();
    }

    show(data = []){
        this.element.innerHTML = 
            data.length > 0 
            ? this.template.getList(data) 
            : this.template.getEmptyMessge();
        super.show();
    }
}

class Template{
    getEmptyMessge(){
        return `
            <div class="empty-box">검색결과가 없습니다.</div>
        `;
    }

    getList(data=[]){
        return `
            <ul class="result">
                ${data.map(this._getItem).join("")}
            </ul>
        `;
    }

    _getItem({imageUrl, name}){
        return `
            <li>
                <img src="${imageUrl}" alt="${name}" />
                <p>${name}</p>
            </li>
        `;
    }
}