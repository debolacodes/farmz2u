const express = require("express");
const router = express.Router();
const informationService = require("./information.service");

router.post("/", _add);
router.put("/:id", _update);
router.get("/", getAll);
router.get("/:id", getById);
router.get("/user/:id", getByUserId);
router.delete("/:id", _delete);

module.exports = router;

function _add(req, res, next) {
  informationService
    ._create(req.query)
    .then((information) => res.json(information))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  informationService
    .getAll()
    .then((information) => res.json(information))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  informationService
    .getAll(req.params.id)
    .then((information) => res.json(information))
    .catch((err) => next(err));
}

function getByUserId(req, res, next) {
  informationService
    .getByUserId(req.params.id)
    .then((information) => res.json(information))
    .catch((err) => next(err));
}

function _update(req, res, next) {
  informationService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  informationService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
