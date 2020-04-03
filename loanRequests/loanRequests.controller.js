const express = require("express");
const router = express.Router();
const loanRequestsService = require("./loanRequests.service");

router.post("/", _add);
router.put("/:id", _update);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", _delete);

module.exports = router;

function _add(req, res, next) {
  loanRequestsService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  console.log("Here");
  loanRequestsService
    .getAll()
    .then(loanRequests => res.json(loanRequests))
    .catch(err => next(err));
}

function getById(req, res, next) {
  console.log("Here");
  loanRequestsService
    .getAll(req.params.id)
    .then(loanRequest => res.json(loanRequest))
    .catch(err => next(err));
}

function _update(req, res, next) {
  loanRequestsService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  loanRequestsService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
