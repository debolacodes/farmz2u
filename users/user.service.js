const uuidv1 = require("uuid/v1");
const randomstring = require("randomstring");
const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;

// uuidv1();

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  createAdmin,
  createCurious,
  _update,
  delete: _delete,
  getByToken,
};

async function authenticate(req) {
  username = req.body.username;
  password = req.body.password;
  const user = await User.findOne({ username });

  // console.log(user);
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign(
      {
        sub: user.id,
        admin: user.admin,
        curious: user.curiousUser,
        general: user.generalUser,
        date_created: Date.now(),
      },
      config.secret
    );

    Object.assign(user, { token: token });
    await user.save();
    let SuccessMessage = { mesage: "Success" };

    return {
      ...userWithoutHash,
      token,
      message: "Success",
    };
  }
}

async function getAll() {
  return await User.find().select("-hash");
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}

async function getByToken(id, usertoken) {
  return await User.findById({ _id: id, token: usertoken });
}

async function create(userParam) {
  // validate
  // check username and email address
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  if (await User.findOne({ username: userParam.email })) {
    throw 'Username "' + userParam.email + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user

  await user.save();
}

async function createCurious() {
  var username = randomstring.generate(7);
  var password = username;
  var curiousHash = bcrypt.hashSync(password, 10);
  console.log(curiousHash);
  var newUser = {
    username: username,
    hash: curiousHash,
    curiousUser: true,
  };
  const cuser = new User(newUser);
  await cuser.save();

  const user = await User.findOne({ username }).select("-hash");
  const token = jwt.sign(
    {
      sub: user.id,
      admin: user.admin,
      curious: user.curiousUser,
      general: user.generalUser,
      date_created: Date.now(),
    },
    config.secret
  );

  Object.assign(user, { token: token });
  await user.save();

  return {
    user,
    token,
  };
}

async function create(userParam) {
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  if (await User.findOne({ username: userParam.email })) {
    throw 'Username "' + userParam.email + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function createAdmin(userParam) {
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  if (await User.findOne({ username: userParam.email })) {
    throw 'Username "' + userParam.email + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  //Make user Admin

  user.userType = 2;

  // save user
  await user.save();
}

async function _update(id, userParam) {
  const user = await User.findById(id);
  // validate
  if (!user) throw "User not found";
  if (userParam.username !== undefined) {
    if (
      user.username !== userParam.username &&
      (await User.findOne({ username: userParam.username }))
    ) {
      throw 'Username "' + userParam.username + '" is already taken';
    }
  }

  if (userParam.password !== undefined) {
    // hash password if it was entered
    if (userParam.password) {
      userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
  }

  console.log(userParam);
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
