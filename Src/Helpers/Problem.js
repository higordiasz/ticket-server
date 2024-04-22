import ProblemList from "../../Config/problemList.json" assert { type: "json" };
import Config from "../../Config/cofnig.json" assert { type: "json" };

const Controller = {};

/**
 *
 * @param {String} problem
 * @returns {Boolean}
 */
Controller.checkProblem = (problem) => {
  return ProblemList["PROBLEMLIST"][problem.toUpperCase()] != null;
};

/**
 *
 * @param {String} problem
 * @param {String} language
 * @returns {String}
 */
Controller.problemName = (problem, language = "en") => {
  return ProblemList["PROBLEMLIST"][problem.toUpperCase()]["NAME"][
    language.toLowerCase()
  ];
};

export default Controller;
