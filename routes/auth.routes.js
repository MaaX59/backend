const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const saltRounds = 10;

