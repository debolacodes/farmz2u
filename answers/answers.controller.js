const express = require("express");
const router = express.Router();
const answerService = require("./answers.service");

// routes

router.post("/", submitAnswer);
router.put("/", _update);
router.get("/:id", getById);
router.get("/", getAll);
router.get("/user/:userId", getByUser);
router.get("/user/:userId/question/:questionId", quser);
router.delete("/:id", _delete);

module.exports = router;

function submitAnswer(req, res, next) {
  answerService
    .submitAnswer(req)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  answerService
    .getAll()
    .then((answers) => res.json(answers))
    .catch((err) => next(err));
}
function getByUser(req, res, next) {
  answerService
    .getByUser(req.params.userId)
    .then((answers) => res.json(answers))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  answerService
    .getById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function _update(req, res, next) {
  answerService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
function quser(req, res, next) {
  answerService
    .quser(req.params.questionId, req.params.userId)
    .then((answers) => res.json(answers))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  answerService
    ._delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
