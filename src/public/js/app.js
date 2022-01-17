// 서버와 연결된 소켓
const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

socket.addEventListener("open", () => {
  console.log("Connected to Browser ✔");
});

socket.addEventListener("message", (msg) => {
  const li = document.createElement("li");
  li.innerText = msg.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Closed Connection. ❌");
});

messageForm.addEventListener("submit", handleSubmit);

nickForm.addEventListener("submit", handleNickSubmit);

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
}

function handleSubmit(event) {
  event.preventDefault(true);
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_msg", input.value));
  input.value = "";
}

function makeMessage(type, payload){
  const msg = {type, payload}
  return JSON.stringify(msg);
}