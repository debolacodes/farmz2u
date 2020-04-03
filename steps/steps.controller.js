const express = require("express");
const router = express.Router();
const stepsService = require("./steps.service");

router.post("/", _add);
router.put("/:id", _update);
router.get("/", getAll);
router.get("/:id", getById);
router.get("/user/:userId", getByUserSteps);
router.delete("/:id", _delete);

module.exports = router;

function _add(req, res, next) {
  stepsService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
function getByUserSteps(req, res, next) {
  stepsService
    .getByUserSteps(req.params.userId)
    .then(answers => res.json(answers))
    .catch(err => next(err));
}
function getAll(req, res, next) {
  stepsService
    .getAll()
    .then(steps => res.json(steps))
    .catch(err => next(err));
}

function getById(req, res, next) {
  console.log("Here");
  stepsService
    .getAll(req.params.id)
    .then(steps => res.json(steps))
    .catch(err => next(err));
}

function _update(req, res, next) {
  console.log("Adebola");
  stepsService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  stepsService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
