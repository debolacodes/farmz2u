const express = require("express");
const router = express.Router();
const requirementService = require("./requirements.service");

router.post("/", _add);
router.put("/:id", _update);
router.get("/", getAll);
router.get("/:id", getById);
router.get("/user/:userId", getByUserRequirements);
router.delete("/:id", _delete);

module.exports = router;

function _add(req, res, next) {
  requirementService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getByUserRequirements(req, res, next) {
  requirementService
    .getByUserRequirements(req.params.userId)
    .then(answers => res.json(answers))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  console.log("Here");
  requirementService
    .getAll()
    .then(requirements => res.json(requirements))
    .catch(err => next(err));
}

function getById(req, res, next) {
  console.log("Here");
  requirementService
    .getAll(req.params.id)
    .then(requirements => res.json(requirements))
    .catch(err => next(err));
}

function _update(req, res, next) {
  console.log("Adebola");
  requirementService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  requirementService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
