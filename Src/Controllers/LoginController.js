import * as Tools from "../Helpers/index.js";

const Controller = {};

Controller.login = async (req, res) => {
  console.log("Login requested");
  return res.status(200).send({
    error: false,
    message: "Success",
    token: "UAGRFNDJVBRYHFBV875kBFDHF",
  });
};

export default Controller;
