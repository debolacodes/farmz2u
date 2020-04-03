const config = require("config.json");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model"),
  Questions: require("../questions/questions.model"),
  Options: require("../questions.options/options.model"),
  Answers: require("../answers/answers.model"),
  Farming_type: require("../farmingTypes/farmingTypes.model"),
  LoanRequests: require("../loanRequests/loanRequests.model"),
  Kyc: require("../kyc/kyc.model"),
  Steps: require("../steps/steps.model"),
  Requirements: require("../requirements/requirements.model"),
  Skills: require("../skills/skills.model"),
  SkillsResults: require("../skillsresults/results.model"),
  RequirementsResults: require("../requirementsresults/results.model"),
  StepsResults: require("../stepsresults/results.model"),
  Access: require("../access/model"),
  Information: require("../information/information.model")
};
