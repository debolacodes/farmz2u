﻿const express = require("express");
const router = express.Router();
const userService = require("./user.service");

// routes
router.post("/authenticate", authenticate);

//Works as required
router.post("/", register);
router.post("/curious", createCurious);
router.put("/:id", _update);
router.get("/:id", getById);
router.get("/", getAll);
router.post("/admin", register);
router.delete("/:id", _delete);

module.exports = router;

function _update(req, res, next) {
  userService
    ._update(req.params.id, req.query)
    .then(() => res.json({}))
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
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
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

function createCurious(req, res, next) {
  // console.log("Ade");
  userService
    .createCurious()
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}
