export default class Hooks {
  static BASE_URL_1 = "https://react.dev/reference/react/";
  static BASE_URL_2 = "https://react.dev/reference/react-dom/hooks/";
  static BASE_URL_3 = "https://reactrouter.com/en/main/hooks/";

  static listData = [];

  static setSourceUrl = (val = "React DOM Hooks") => {
    switch (val) {
      case "React Hooks":
        this.MAIN_URL = this.BASE_URL_1;
        break;
      case "React Router Hooks":
        this.MAIN_URL = this.BASE_URL_3;
        break;
      default:
      case "React DOM Hooks":
        this.MAIN_URL = this.BASE_URL_2;
        break;
    }
  };

  static createNewList(val, title) {
    val.map((item) => {
      let newHookName = "";
      this.setSourceUrl(title);
      const url = this.MAIN_URL + item;

      if (item.includes("-")) {
        const wordArr = item.split("-");
        wordArr.map((item) => {
          newHookName += item[0].toUpperCase() + item.slice(1).toLowerCase();
          return console.log(
            (newHookName = newHookName[0].toLowerCase() + newHookName.slice(1))
          );
        });
      } else {
        newHookName = item + "()";
      }

      this.listData.push({
        id: val.indexOf(item),
        btnContent:
          title !== "React Router Hooks" ? newHookName : newHookName + "()",
        href: url,
        title: title,
      });
      return item;
    });
  }
}
