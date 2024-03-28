import Language from "../../Config/language.json" assert { type: "json" };

const Controller = {};

Controller.getMessage = (message = "DEFAULT_MESSAGE", language = "en") => {
  let messageString = message.toUpperCase();
  let languageString = language.toLowerCase();
  return Language[messageString][languageString];
};

export default Controller;
