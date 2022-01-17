// 서버와 연결된 소켓
const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

socket.addEventListener("open", () => {
  console.log("Connected to Browser ✔");
});

socket.addEventListener("message", (msg) => {
  console.log(msg.data);
});

socket.addEventListener("close", () => {
  console.log("Closed Connection. ❌");
});

messageForm.addEventListener("submit", handleSubmit);

function handleSubmit(event){
  event.preventDefault(true);
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}
