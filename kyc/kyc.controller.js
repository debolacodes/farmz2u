const express = require("express");
const router = express.Router();
const kycService = require("./kyc.service");

router.post("/", _add);
router.put("/:id", _update);
router.get("/", getAll);

module.exports = router;

function _add(req, res, next) {
  kycService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  console.log("Here");
  kycService
    .getAll()
    .then(kyc => res.json(kyc))
    .catch(err => next(err));
}

function getById(req, res, next) {
  console.log("Here");
  kycService
    .getAll(req.params.id)
    .then(kyc => res.json(kyc))
    .catch(err => next(err));
}

function _update(req, res, next) {
  console.log("Adebola");
  kycService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  kycService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
