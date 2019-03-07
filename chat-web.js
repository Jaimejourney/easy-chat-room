const chat = require('./chat');
let i = 0;

const chatWeb = {
  pageWrap: function(content) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/chat.css"/>
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            ${content}
          </div>
          <script src="/chat.js"></script>
        </body>
      </html>
    `
  },

  loginPage: function() {
    return this.pageWrap(
      `
      <div class="login">
        <form action="/login" method="POST">
          <input class = "to-login" id="username" name="username" placeholder="Enter Username"/>
          <button class = "login" id="button" type="submit">Login</button>
        </form>
      </div>
    `);
  },


  
  chatPage: function(chat, username) {
    return this.pageWrap(`
      ${this.logout(username)}
      <div class="display-panel">
        <div class = "display-users">
        ${this.getUserList(chat)}
        <button id="unselectButton" class = "unselect">unselect</button>
        </div>
        ${this.getMessageList(chat)}
      </div>
      ${this.getOutgoing(username)}
    `);
  },
  logout: function(username) {
    return `
      <div class="logout">
        <form action="/logout" method="POST">
          <input type="hidden" name="username" value="${username}"/>
          <button type="submit">Logout</button>
        </form>
      </div>
    `;
  },
  formatMessage: function(message) {
    return `
      <li id = ${message.sender}>
        <div id = "message" class="message">
          <div class="meta-info">
            <div class="sender-info">
              <span class="username">${message.sender}</span>
            </div>
            <div class="message-info">
              <span class="timestamp">${message.timestamp}</span>
            </div>
          </div>
          <p class="message-text">${message.text}</p>
        </div>
      </li>
    `;
  },
  getMessageList: function(chat) {
    return `
      <ol id = "messages" class="messages">
      ${ chat.messages.map( this.formatMessage ).join('') }
      </ol>
    `;
  },
  
  getPartMessageList: function(list) {
    return `
      ${ list.map( this.formatMessage ).join('') }
    `;
  },
  formatUser: function(user,index) {
    return `
      <li>
        <div class="user">
          <input type="checkbox" class="checkbox1" value="${index}" name = c${user}>
          <span id = "${index}" class="username" name = ${user} >${user}</span>
        </div>
      </li>
    `;
  },
  getUserList: function(chat) {
    return `
      <ul class="users">
        ${ Object.values(chat.users,i++).map( this.formatUser ).join('') }
      </ul>
      
    `;
  },
  getOutgoing: function(username) {
    return `
      <div class="outgoing">
        <form class="send" action="/chat" method="POST">
          <input type="hidden" name="username" value="${username}"/>
          <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
          <button type="submit">Send</button>
        </form>
        <form class="refresh" action="/" method="GET">
          <input type="hidden" name="username" value="${username}"/>
          <button type="submit">Refresh</button>
        </form>
      </div>
    `;
  }
};
module.exports = chatWeb;
