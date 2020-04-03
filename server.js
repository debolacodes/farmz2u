require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

// api routes
app.use("/users", require("./users/users.controller"));
app.use("/questions", require("./questions/questions.controller"));
app.use("/options", require("./questions.options/options.controller"));
app.use("/answers", require("./answers/answers.controller"));
app.use("/questions", require("./questions/questions.controller"));
app.use("/options", require("./questions.options/options.controller"));
app.use("/farmingTypes", require("./farmingTypes/farmingTypes.controller"));
app.use("/skills", require("./skills/skills.controller"));
app.use("/steps", require("./steps/steps.controller"));
app.use("/requirements", require("./requirements/requirements.controller"));

//results
app.use("/skillsresults", require("./skillsresults/results.controller"));
app.use(
  "/requirementsresults",
  require("./requirementsresults/results.controller")
);
app.use("/stepsresults", require("./stepsresults/results.controller"));

app.use("/loanrequest", require("./loanRequests/loanRequests.controller"));
app.use("/information", require("./information/information.controller"));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
