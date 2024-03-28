import APICONFIG from "../../Config/cofnig.json" assert { type: "json" };

const Config = {};

Config.minUsernameLenght = APICONFIG.API_CONFIG.USERNAME_MIN_LENGTH;

Config.maxUsernameLenght = APICONFIG.API_CONFIG.USERNAME_MAX_LENGTH;

Config.minPasswordLength = APICONFIG.API_CONFIG.PASSWORD_MIN_LENGTH;

Config.maxPasswordLength = APICONFIG.API_CONFIG.PASSWORD_MAX_LENGTH;

export default Config;
