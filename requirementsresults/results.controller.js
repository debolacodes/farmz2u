const express = require("express");
const router = express.Router();
const resultService = require("./results.service");

router.post("/", _add);
router.put("/:id", _update);
router.get("/", getAll);
router.get("/:id", getById);
router.get("/option/:optionId", getByOptionId);
router.get("/option/:optionId/type/:type", getByOptionIdResultType);
router.delete("/:id", _delete);

module.exports = router;

function _add(req, res, next) {
  resultService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  resultService
    .getAll()
    .then(result => res.json(result))
    .catch(err => next(err));
}

function getById(req, res, next) {
  resultService
    .getById(req.params.id)
    .then(results => res.json(results))
    .catch(err => next(err));
}

function getByOptionId(req, res, next) {
  resultService
    .getByOptionId(req.params.optionId)
    .then(result => res.json(result))
    .catch(err => next(err));
}

function getByOptionIdResultType(req, res, next) {
  resultService
    .getByOptionIdResultType(req.params.optionId, req.params.type)
    .then(results => res.json(results))
    .catch(err => next(err));
}

function _update(req, res, next) {
  resultService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  resultService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
