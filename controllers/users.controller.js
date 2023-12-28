// application logging service
const { logError, logInfo } = require("../services/logging/index");

// fake user database
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Get all users
const getUsers = (req, res) => {
  res.json(users);
};

// Get a single user
const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    logInfo("User not found")
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// Create a new user
const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users[users.length - 1].id + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update a user by ID
const updateUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  let user = users.find((user) => user.id === userId);
  if (!user) {
    logInfo("User not found")
    return res.status(404).json({ message: "User not found" });
  }
  user.name = name;
  user.email = email;
  res.json(user);
};

// Delete a user by ID
const deleteUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.status(204).end();
};

const userController = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

module.exports = userController;
