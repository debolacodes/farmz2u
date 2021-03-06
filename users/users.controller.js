﻿const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const answerService = require("../answers/answers.service");

// routes
router.post("/authenticate", authenticate);

//Works as required
router.post("/", register);
router.post("/curious", createCurious);
router.post("/sendcuriousmail", sendcuriousmail);
router.put("/:id", _update);
router.get("/:id", getById);

router.get("/", getAll);
router.get("/getdeleted/", getAll);

router.post("/admin", register);
router.delete("/restore/:id", _restore);
router.delete("/:id", _delete);
router.delete("/shred/:id", deleteTotally);

module.exports = router;
function sendcuriousmail(req, res, next) {
  answerService
    .sendCuriousmail(req.body)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}
function _update(req, res, next) {
  userService
    ._update(req.params.id, req.query)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}

function authenticate(req, res, next) {
  userService
    .authenticate(req)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function registerAdmin(req, res, next) {
  console.log(req);
  userService
    .createAdmin(req.body)
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  let v = decodeURI(req.query.usertype);

  if (v === "active") {
    console.log(v);
    userService
      .getAll()
      .then((users) => res.json(users))
      .catch((err) => next(err));
  } else {
    userService
      .getAllDeleted()
      .then((users) => res.json(users))
      .catch((err) => next(err));
  }
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function deleteTotally(req, res, next) {
  userService
    ._deleteTotally(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => next(err));
}
function _restore(req, res, next) {
  userService
    ._restore(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function createCurious(req, res, next) {
  // console.log("Ade");
  userService
    .createCurious()
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}
