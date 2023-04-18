import { createNextId } from "./helpers.js";
import storage from "./storage.js";

const tag = "[Store]";

class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;

  }

  search(keyword){
    this.addHistory(keyword);
    console.log("Store.js", keyword);
    return this.storage.productData.filter((product) =>
     product.name.includes(keyword)
    );
  }

  addHistory(keyword = ""){//keyword 를 받거나 없는 경우는 빈 문자로 초기화
    keyword = keyword.trim();
    if(!keyword){
      return;
    }
    const hasHistory = this.storage.historyData.some(history => history.keyword === keyword); //지금 있는 값과 같은 값이 있는지 체크
    if (hasHistory){
      this.removeHistory(keyword);
    }

    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({id,keyword,date});
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);    
  }

  getKeywordList(){
    return this.storage.keywordData;
  }

  getHistoryList(){
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(history1, history2){
    return history2.date > history1.date;
  }

  removeHistory(keyword){
    this.storage.historyData = this.storage.historyData.filter(
      (history)  => history.keyword !== keyword);
  }

}

const store = new Store(storage)
export default store;