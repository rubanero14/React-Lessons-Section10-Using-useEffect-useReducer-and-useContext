export default class Hooks {
  static BASE_URL_1 = "https://react.dev/reference/react/";
  static BASE_URL_2 = "https://react.dev/reference/react-dom/hooks/";

  static listData = [];

  static createNewList(val) {
    val.map((item) =>
      this.listData.push({
        id: val.indexOf(item),
        btnContent: item + "()",
        href:
          (item === "useFormStatus" ? this.BASE_URL_2 : this.BASE_URL_1) + item,
      })
    );
  }
}
