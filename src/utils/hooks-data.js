export default class Hooks {
  static BASE_URL = "https://beta.reactjs.org/reference/react/";

  static listData = [];

  static createNewList(val) {
    val.map((item) =>
      this.listData.push({
        id: val.indexOf(item),
        btnContent: item + "()",
        href: this.BASE_URL + item,
      })
    );
  }
}
