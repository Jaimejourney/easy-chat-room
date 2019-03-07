let checkedlist = [];
console.log(window.name);
console.log(window.name.split(","));
for(let i = 0;i < window.name.split(",").length;i++){
  if(window.name.split(",")[i] != ""){
    checkedlist.push(window.name.split(",")[i]);
  }
}
console.log(checkedlist);
paint();
showRecords();


( function IIFE() {
  const sendButton = document.querySelector(".send button");
  const toSend = document.querySelector(".to-send");
  if(toSend && sendButton) {
    sendButton.disabled = !toSend.value;
    toSend.addEventListener('input', (e) => {
      if(e.target.value) {
        sendButton.disabled = false;
      } else {
        sendButton.disabled = true;
      }
    });
  }
})();

( function IIFE(){
  const loginButton = document.querySelector(".login button");
  const tologin = document.querySelector(".to-login");
  if(tologin && loginButton){
    loginButton.disabled = !tologin.value;
    tologin.addEventListener('input',(e) =>{
      if(e.target.value){
        loginButton.disabled = false;
      }else{
        loginButton.disabled = true;
      }
    });
  }
})();

function paint(){
  for(let i = 0;i < checkedlist.length;i++){
    document.getElementsByName("c"+checkedlist[i])[0].checked = true;
    document.getElementsByName(checkedlist[i])[0].setAttribute("style", "color: red;");
  }
}

function showRecords(){
  var myNode = document.getElementById("messages");
  if(checkedlist.length <= 0){
    for(var i = 0;i < myNode.children.length;i++){
      if(myNode.children[i].nodeName === "P"){
        myNode.removeChild(myNode.children[i]);
        i--;
      }else{
        myNode.children[i].style.display = "block";
      }
      document.getElementById("unselectButton").style.display = "none";
    }
  }else{
    for(var i = 0;i < myNode.children.length;i++){
      if(myNode.children[i].nodeName === "P"){
        myNode.removeChild(myNode.children[i]);
        i--;
      }
    };
    let sign = 0;
    for(var i = 0;i < myNode.children.length;i++){
    if(checkedlist.includes(myNode.children[i].id) === false){
      sign++;
      myNode.children[i].style.display = "none";
    }else{
      if(sign > 0){
        var z = document.createElement('p'); // is a node
        z.id = myNode.children[i].id;
        z.className = "hidden";
        z.innerHTML = 'Some texts have been hidden';
        myNode.insertBefore(z,myNode.children[i]);
        i++;
        sign = 0;
      }
      myNode.children[i].style.display = "block";
    }
  }
  if(sign > 0){
    var z = document.createElement('p');
    z.className = "hidden";
    z.innerHTML = 'Some texts have been hidden';
    myNode.appendChild(z);
  }
  };
}

( function check(){
  console.log("test");
  const checkboxes =  document.querySelectorAll(".checkbox1");
  Array.from(checkboxes).forEach(function(element) {
    element.addEventListener('change', (e) => {
      if(element.checked) {
        document.getElementById(element.value).setAttribute("style", "color: red;");
        document.getElementById("unselectButton").style.display = "block";
        checkedlist.push(document.getElementById(element.value).innerHTML);
        window.name = checkedlist;
          // Checkbox is checked..
      } else {  
          // Checkbox is not checked..
          document.getElementById(element.value).setAttribute("style", "color: black;");
          var index = checkedlist.indexOf(document.getElementById(element.value).innerHTML);
          if(index > -1){
            checkedlist.splice(index,1);
          }
          window.name = checkedlist;
      }
      showRecords();
    }) ;
  });
})();

( function unselect(){
  const unselectButton = document.getElementById("unselectButton");
  const checkboxes =  document.querySelectorAll(".checkbox1");
  unselectButton.addEventListener('click',(e) => {
    Array.from(checkboxes).forEach(function(element) {
        if(element.checked == true) {
          element.checked = false;
          document.getElementById(element.value).setAttribute("style", "color: black;");
          checkedlist = [];
          var myNode = document.getElementById("messages");
          for(var i = 0;i < myNode.children.length;i++){
            console.log(myNode.children[i].nodeName);
            if(myNode.children[i].nodeName === "P"){
              myNode.removeChild(myNode.children[i]);
              i--;
            }else{
              myNode.children[i].style.display = "block";
            }
          }
        }
      }) ;
  document.getElementById("unselectButton").style.display = "none";
  });
})();