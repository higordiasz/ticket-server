import Config from "../../Config/cofnig.json" assert { type: "json" };

const Version = {};

Version.getVersion = () => {
  return Config.API_VERSION.VERSION;
};

export default Version;
