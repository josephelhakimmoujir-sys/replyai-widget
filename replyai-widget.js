(function () {

  //////////////////////////////
  // CONFIG
  //////////////////////////////
  const config = {
    name: "ReplyAI",
    color: "#3b82f6",
    welcomeMessage: "Hi! How can I help you today?"
  };

  let started = false;

  //////////////////////////////
  // FLOAT BUTTON
  //////////////////////////////
  const button = document.createElement("div");
  button.innerHTML = "💬";

  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "58px",
    height: "58px",
    background: config.color,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    cursor: "pointer",
    color: "white",
    zIndex: "999999"
  });

  document.body.appendChild(button);

  //////////////////////////////
  // CHAT WINDOW
  //////////////////////////////
  const box = document.createElement("div");

  Object.assign(box.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "300px",
    height: "400px",
    background: "#111827",
    borderRadius: "12px",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: "999999"
  });

  box.innerHTML = `
    <div style="padding:10px;background:#1f2937;color:white;text-align:center;">
      ${config.name}
    </div>

    <div id="chat" style="flex:1;padding:10px;overflow:auto;color:white;font-size:14px;"></div>

    <div style="display:flex;padding:10px;gap:5px;background:#0f172a;">
      <input id="input" style="flex:1;padding:8px;border:none;border-radius:8px;" placeholder="Type..." />
      <button id="send" style="background:${config.color};color:white;border:none;padding:8px;border-radius:8px;">
        Send
      </button>
    </div>
  `;

  document.body.appendChild(box);

  //////////////////////////////
  // CHAT FUNCTIONS
  //////////////////////////////
  function addMessage(type, text) {
    const chat = document.getElementById("chat");

    chat.innerHTML += `
      <div style="
        margin:5px 0;
        text-align:${type === "user" ? "right" : "left"};
        color:white;
      ">
        ${text}
      </div>
    `;

    chat.scrollTop = chat.scrollHeight;
  }

  function reply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("hello")) return "Hi! How can I help?";
    if (msg.includes("price")) return "Please contact us for pricing.";
    if (msg.includes("book")) return "I can help you book an appointment.";

    return "I can help with bookings and info.";
  }

  function send() {
    const input = document.getElementById("input");
    if (!input.value.trim()) return;

    addMessage("user", input.value);
    addMessage("bot", reply(input.value));

    input.value = "";
  }

  //////////////////////////////
  // EVENTS
  //////////////////////////////
  button.onclick = () => {
    box.style.display = box.style.display === "none" ? "flex" : "none";

    if (!started) {
      addMessage("bot", config.welcomeMessage);
      started = true;
    }
  };

  document.getElementById("send").onclick = send;

  document.getElementById("input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });

})();
