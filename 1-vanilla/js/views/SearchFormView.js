import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    console.log(tag, "constructor");

    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);

    this.showResetButton(false);
    this.bindEvents();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", () => this.handleKeyup());
    this.on("submit", (event) => this.handleSubmit(event));
    on(this.resetElement, "click", () => this.handleReset());
  }

  handleKeyup() {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);

    if(value.length <= 0){
        this.handleReset();
    }
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(tag, "handleSubmit"); 
    const {value} = this.inputElement;
    this.emit("@submit",{value}); //emit : 이벤트를 다른 쪽으로 수신하고 싶을 때 사용.
  }

  handleReset(){
    console.log(tag,"handleReset");
    this.emit("@reset");
  }

  show(value = ""){
    this.inputElement.value = value;
    this.showResetButton(this.inputElement.value.length > 0);
    super.show();
  }
}
