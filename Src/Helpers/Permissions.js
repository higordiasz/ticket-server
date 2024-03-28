import Config from "../../Config/cofnig.json" assert { type: "json" };

const List = {};
List.user = {
  create_user: "create_user",
  create_support: "create_support",
  create_admin: "create_admin",
};
List.Ticket = {
  create: "create_ticket",
  close: "close_ticket",
  reply: "reply_ticket",
};
List.Company = {
  report_monthly: "monthly_report",
  report_daily: "daily_report",
};

const Permissions = {};
Permissions.List = List;
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
