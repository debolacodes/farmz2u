const express = require("express");
const router = express.Router();
const farmingType_Service = require("./farmingTypes.service");

// routes
router.put("/:id", ft_update);
router.post("/", _add);
router.delete("/:id", _delete);
router.get("/:id", getbyId);
router.get("/", getAll);

module.exports = router;

function ft_update(req, res, next) {
  farmingType_Service
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
function _delete(req, res, next) {
  farmingType_Service
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
function getAll(req, res, next) {
  farmingType_Service
    .getAll()
    .then(farmingType => res.json(farmingType))
    .catch(err => next(err));
}
function getbyId(req, res, next) {
  farmingType_Service
    .getbyId(req.params.id)
    .then(farmingType =>
      farmingType ? res.json(farmingType) : res.sendStatus(404)
    )
    .catch(err => next(err));
}
function _add(req, res, next) {
  farmingType_Service
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
