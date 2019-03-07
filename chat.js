const users = {};

const messages = [];

const checkedlist = [];

function addMessage({ sender, timestamp, text }) {
  messages.push({ sender, timestamp, text });
}

function addCheckedList({name}){
  checkedlist.push(name);
}

function addUser({ username }) {
  users[username] = username;
}

function removeUser({ username }) {
  delete users[username];
}

const chat = {
  users,
  messages,
  addMessage,
  addUser,
  removeUser,
  checkedlist
};

module.exports = chat;

