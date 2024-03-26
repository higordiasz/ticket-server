import Config from "../../Config/cofnig.json" assert { type: "json" };

const Permissions = {};

Permissions.havePermission = (
  permission = "create_ticket",
  userType = "user"
) => {
  let permissionString = permission.toLowerCase();
  let userString = userType.toLowerCase();
  switch (userString) {
    case "user":
      return Config.USER_PERMISSIONS.USER[permissionString];
    case "admin":
      return Config.USER_PERMISSIONS.ADMIN[permissionString];
    case "support":
      return Config.USER_PERMISSIONS.SUPPORT[permissionString];
    default:
      return false;
  }
};

export default Permissions;
