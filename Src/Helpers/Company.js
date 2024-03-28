import Company from "../../Config/companies.json" assert { type: "json" };

const Controller = {};

Controller.validateDepartments = (company, departments) => {
  let keys = Object.keys(Company);
  let haveKey = false;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == company.toUpperCase()) {
      haveKey = true;
    }
  }
  if (haveKey) {
    if (!Array.isArray(departments)) return false;
    if (departments.length < 1) return false;
    keys = Object.keys(Company[company]);
    for (let i = 0; i < departments.length; i++) {
      if (!keys.includes(departments[i].toUpperCase())) return false;
    }
    return true;
  }
  return false;
};

export default Controller;
