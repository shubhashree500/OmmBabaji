const express = require('express');
const router = express.Router();
const { createUser, getUser, getUserById, updateUser, deleteUser, loginUser } = require('../controllers/userController');

router.route("/register")
.post(createUser);

router.route("/getall")
.get(getUser);

router.route("/get/:id")
.get(getUserById);

router.route("/update/:id")
.patch(updateUser);

router.route("/delete/:id")
.delete(deleteUser);

router.route("/login/:id")
.post(loginUser);


module.exports = router;
