import React, { useState } from "react";
import io from "socket.io-client";

//Listen for events
let socket;
var ENDPOINT = "localhost:4000";
socket = io(ENDPOINT);

socket.on("chat", function (data) {
  document.getElementById("feedback2").innerHTML = "";
  document.getElementById("output").innerHTML +=
    "<p><strong>" + data.one + ": </strong>" + data.two + "</p>";
});

socket.on("typing", function (data) {
  document.getElementById("feedback2").innerHTML =
    "<p><em>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;" +
    data +
    " is typing a message...</em></p>";
});
socket.on("join", function (data) {
  document.getElementById("feedback").innerHTML +=
    "<p><em>" +
    data.firstName +
    " " +
    data.lastName +
    " has joined the chat </em></p>";
});

//Component

function Chat() {
  const [input1, setInput1] = useState("");

  const [input2, setInput2] = useState("");

  function handleClick() {
    socket.emit("chat", {
      one: input1,
      two: input2,
    });
  }

  function handleChange(event) {
    setInput1(event.target.value);
  }

  function handleChange2(event) {
    setInput2(event.target.value);
    socket.emit("typing", document.getElementById("username").value);
  }

  return (
    <div>
      <h1 className="chatTitle">chat</h1>
      <div id="chat-room">
        <div id="chat-window">
          <div id="feedback"></div>
          <div id="output"></div>

          <div id="feedback2"></div>
        </div>
        <input
          id="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          id="texts"
          type="text"
          placeholder="Message"
          onChange={handleChange2}
        />
        <button onClick={handleClick} id="send">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
