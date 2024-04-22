import Language from "../../Config/language.json" assert { type: "json" };
import Config from "../../Config/cofnig.json" assert { type: "json" };

const Controller = {};
const DEFAULT_LANGUAGE = Config.DEFAULT_LANGUAGE || "en";

Controller.getMessage = (message = "DEFAULT_MESSAGE", language = "default") => {
  let messageString = message.toUpperCase();
  let languageString = "";
  if (language == "default") {
    languageString = DEFAULT_LANGUAGE.toLowerCase();
  } else {
    languageString = language.toLowerCase();
  }
  return Language[messageString][languageString];
};

export default Controller;
