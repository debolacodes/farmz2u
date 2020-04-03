const express = require("express");
const router = express.Router();
const skillsService = require("./skills.service");

router.post("/", _add);
router.put("/:id", _update);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", _delete);
router.get("/user/:userId", getByUserSkills);

module.exports = router;

function _add(req, res, next) {
  skillsService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  console.log("Here");
  skillsService
    .getAll()
    .then(skills => res.json(skills))
    .catch(err => next(err));
}
function getByUserSkills(req, res, next) {
  skillsService
    .getByUserSkills(req.params.userId)
    .then(answers => res.json(answers))
    .catch(err => next(err));
}
function getById(req, res, next) {
  console.log("Here");
  skillsService
    .getAll(req.params.id)
    .then(skills => res.json(skills))
    .catch(err => next(err));
}

function _update(req, res, next) {
  console.log("Adebola");
  skillsService
    ._update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  skillsService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
