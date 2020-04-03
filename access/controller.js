const express = require("express");
const router = express.Router();
const accessService = require("./access.service");

// routes
router.post("/", _create);
router.put("/", _update);
router.get("/", getAll);
router.get("/method/:method", getByPathMethod);
router.delete("/:id", _delete);

module.exports = router;

// Get Methods

function getAll(req, res, next) {
  accessService
    .getAll()
    .then(access => res.json(access))
    .catch(err => next(err));
}
function getByPathMethod(req, res, next) {
  accessService
    .getByPathMethod(req.params.method, req.query.path)
    .then(access => res.json(access))
    .catch(err => next(err));
}

function _update(req, res, next) {
  accessService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
function _create(req, res, next) {
  accessService
    ._create(req.body)
    .then(access => res.json(access))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  accessService
    ._delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
