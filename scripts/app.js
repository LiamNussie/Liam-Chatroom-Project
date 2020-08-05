// DOM queries
const chatList =document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const buttons = document.querySelectorAll('.room-btn');
// const defaultBtn = document.querySelector('.default-room');

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
    
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset form
    newNameForm.reset();
    // show then hide the update message
    updateMssg.innerText = `Your name was updated to ${newName}!`;
    setTimeout(() => updateMssg.innerText = ``, 2000)
});

// update chatroom
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

// defaultBtn.addEventListener('onload', () => {
//     this.classList.add('highlight');
// });
 
for (button in buttons) {
   buttons[button].onclick = function() {
       buttons.forEach(function(btn){
         btn.classList.remove('highlight');
       })
       this.classList.add('highlight');
   }
}


// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon'

// class instances

const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));