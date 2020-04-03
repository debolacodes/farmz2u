const express = require("express");
const router = express.Router();
const optionsService = require("./options.service");

router.get("/question/:questionId", getByQuestion);
router.get("/:id", getById);
router.get("/", getAll);
router.post("/", _add);
router.put("/:id", _update);
router.delete("/:id", _delete);

module.exports = router;

function _update(req, res, next) {
  optionsService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _add(req, res, next) {
  optionsService
    .create(req.body)
    .then(optionss => res.json(optionss))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  optionsService
    .getAll()
    .then(optionss => res.json(optionss))
    .catch(err => next(err));
}

function getById(req, res, next) {
  // console.log(req.params);
  optionsService
    .getById(req.params.id)
    .then(options => (options ? res.json(options) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getByQuestion(req, res, next) {
  optionsService
    .getByQId(req.params.questionId)
    .then(options => (options ? res.json(options) : res.sendStatus(404)))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  optionsService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
