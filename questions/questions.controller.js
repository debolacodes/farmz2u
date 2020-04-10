const express = require("express");
const router = express.Router();
const questionService = require("./questions.service");

router.post("/", _add);
router.post("/start", start);
router.get("/next/:userId", getCurrent);
router.get("/:id", getById);
router.get("/", getAll);

router.put("/:id", _update);
router.delete("/:id", _delete);

module.exports = router;

function start(req, res, next) {
  questionService
    .start()
    .then((question) => res.json(question))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  questionService
    .getCurrent(req.params.userId)
    .then((question) => res.json(question))
    .catch((err) => next(err));
}

function _update(req, res, next) {
  console.log("Adebola");
  questionService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _add(req, res, next) {
  questionService
    .create(req.query)
    .then((questions) => res.json(questions))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  questionService
    .getAll()
    .then((questions) => res.json(questions))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  questionService
    .getById(req.params.id)
    .then((question) => (question ? res.json(question) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  questionService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
