const pathToRegexp = require("path-to-regexp");

const expressJwt = require("express-jwt");
const config = require("config.json");
const userService = require("../users/user.service");
const path = require("path");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      "/users/authenticate",
      "/questions/start",
      { url: "/users/curious", methods: ["POST"] },
      { url: "/users", methods: ["POST"] },
      { url: "/information/", methods: ["POST"] },
      { url: /\/information*/, methods: ["GET"] },
      { url: /\/loanrequests*/, methods: ["POST"] },
      { url: /\/users*/, methods: ["PUT"] }
    ]
  });
}

async function isRevoked(req, payload, next) {
  var apiPath = req.path;
  console.log(apiPath);
  var method = req.method;
  const user = await userService.getById(payload.sub);
  if (user) {
    if (payload.admin) {
      next();
    } else if (payload.curious) {
      if (
        (apiPath.includes("/users") && method == "GET") ||
        (apiPath.includes("/questions") && method == "GET") ||
        (apiPath.includes("/answers") && method == "POST") ||
        (apiPath.includes("/steps") && method == "GET") ||
        (apiPath.includes("/requirement") && method == "GET") ||
        (apiPath.includes("/skills") && method == "GET")
      ) {
        next();
      } else {
        next(new Error("Unauthorized Access"));
      }
    } else if (payload.general) {
      if (
        (apiPath.includes("/users") && method == "GET") ||
        (apiPath.includes("/questions") && method == "GET") ||
        (apiPath.includes("/answers") && method == "POST") ||
        (apiPath.includes("/steps") && method == "GET") ||
        (apiPath.includes("/requirements") && method == "GET") ||
        (apiPath.includes("/skills") && method == "GET") ||
        (apiPath.includes("/kyc") && method == "GET") ||
        (apiPath.includes("/loanrequests/") && method == "GET") ||
        (apiPath.includes("/loanrequests/") && method == "POST")
      ) {
        next();
      } else {
        next(new Error("Unauthorized Access"));
      }
    }
  } else {
    return next(new Error("User token Invalid/Expired"));
  }
}
