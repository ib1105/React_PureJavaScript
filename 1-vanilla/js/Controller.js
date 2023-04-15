import { TabType } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView, tabView, keywordListView, historyListView }) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;

    // TODO
    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    
    //this.searchFormView.on("@submit", (event) => this.search(event)); 개발자도구에서 보면 event 발생한 모든 내역을 볼 수 있음. 그중 detail의 value를 뽑아서 보고 싶을 때 아래 코드 사용
    this.searchFormView.on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());

    this.tabView.on("@change", event => this.changeTab(event.detail.value));

    this.keywordListView.on("@click", event => this.search(event.detail.value));

    this.historyListView.on("@click", event => this.search(event.detail.value))
      .on("@remove", (event) => this.removeHistory(event.detail.value)); // " (@@) => " 뜻 : @@(이벤트)가 오면 this의 removeHistory 메소드로 던져준다.

  }

  search(searchKeyword){
    console.log(tag, "search", searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }

  reset(){
    console.log(tag,"reset");
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
  }

  render(){
    if(this.store.searchKeyword.length > 0){  
      return this.renderSearchResult();
    }

    this.tabView.show(this.store.selectedTab);
    if (this.store.selectedTab === TabType.KEYWORD){
      this.keywordListView.show(this.store.getKeywordList());
      this.historyListView.hide();
    }else if (this.store.selectedTab === TabType.HISTORY){
      this.keywordListView.hide();
      this.historyListView.show(this.store.getHistoryList());
    }else{
      throw "사용할 수 없는 탭입니다.";
    }

    this.searchResultView.hide();
  }

  renderSearchResult(){
    this.searchFormView.show(this.store.searchKeyword); //store.searchKeyword에는 검색한 검색어가 들어있음
    this.tabView.hide();
    this.keywordListView.hide();
    this.historyListView.hide();

    this.searchResultView.show(this.store.searchResult);
  }

  removeHistory(keywod){
    this.store.removeHistory(keywod);
    this.render();
  }

  changeTab(tab){
    console.log(tag, "changeTab", tab);

    this.store.selectedTab = tab;
    this.render();
  }
}
