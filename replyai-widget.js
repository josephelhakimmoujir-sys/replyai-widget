(function (window, document) {

  //////////////////////////////
  // PREVENT DOUBLE LOAD
  //////////////////////////////
  if (window.ReplyAI && window.ReplyAI.loaded) return;
  window.ReplyAI = window.ReplyAI || {};
  window.ReplyAI.loaded = true;

  //////////////////////////////
  // CONFIG
  //////////////////////////////
  const config = {
    name: "ReplyAI",
    color: "#3b82f6",
    welcomeMessage: "Hi! How can I help you today?"
  };

  //////////////////////////////
  // SAFE INIT SYSTEM (QUEUE SUPPORT)
  //////////////////////////////
  window.ReplyAI.queue = [];
  window.ReplyAI.ready = false;

  window.ReplyAI.init = function (userConfig) {
    if (!window.ReplyAI.ready) {
      window.ReplyAI.queue.push(userConfig);
      return;
    }
    applyConfig(userConfig);
  };

  function startSaaS() {
    window.ReplyAI.ready = true;

    // apply queued configs
    window.ReplyAI.queue.forEach(cfg => applyConfig(cfg));
    window.ReplyAI.queue = [];

    // first message
    if (!window._started) {
      addMessage("bot", config.welcomeMessage);
      window._started = true;
    }
  }

  //////////////////////////////
  // APPLY CONFIG
  //////////////////////////////
  function applyConfig(userConfig) {
    Object.assign(config, userConfig || {});
    updateUI();
  }

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
    zIndex: "999999",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  });

  document.body.appendChild(button);

  //////////////////////////////
  // WIDGET WINDOW
  //////////////////////////////
  const widget = document.createElement("div");

  Object.assign(widget.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "330px",
    height: "430px",
    background: "#111827",
    borderRadius: "16px",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: "999999",
    boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
  });

  widget.innerHTML = `
    <div id="reply-header" style="
      padding:12px;
      background:#1f2937;
      text-align:center;
      color:white;
      font-weight:bold;
    ">
      ${config.name}
    </div>

    <div id="reply-chat" style="
      flex:1;
      padding:10px;
      overflow:auto;
      color:white;
      font-size:14px;
    "></div>

    <div style="
      display:flex;
      padding:10px;
      gap:8px;
      background:#0f172a;
      border-top:1px solid rgba(255,255,255,0.08);
    ">
      <input id="reply-input" placeholder="Type a message..."
        style="
          flex:1;
          padding:10px;
          border-radius:10px;
          border:none;
          outline:none;
          background:rgba(255,255,255,0.05);
          color:white;
        "
      />

      <button id="reply-send"
        style="
          padding:10px 14px;
          background:${config.color};
          border:none;
          color:white;
          border-radius:10px;
          cursor:pointer;
          font-weight:600;
        ">
        Send
      </button>
    </div>
  `;

  document.body.appendChild(widget);

  //////////////////////////////
  // TOGGLE OPEN/CLOSE
  //////////////////////////////
  button.onclick = () => {
    widget.style.display =
      widget.style.display === "none" ? "flex" : "none";
  };

  //////////////////////////////
  // SIMPLE AI LOGIC
  //////////////////////////////
  function reply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("book")) return "I can help you book an appointment.";
    if (msg.includes("price")) return "Please contact the business for pricing.";
    if (msg.includes("hours")) return "We are open 9am–5pm.";
    if (msg.includes("hello")) return "Hello! How can I help you?";

    return "I can help with bookings, hours, and info.";
  }

  //////////////////////////////
  // CHAT SYSTEM
  //////////////////////////////
  function addMessage(type, text) {
    const chat = document.getElementById("reply-chat");

    chat.innerHTML += `
      <div style="
        text-align:${type === "user" ? "right" : "left"};
        color:${type === "user" ? "#60a5fa" : "#34d399"};
        margin:6px 0;
      ">
        ${text}
      </div>
    `;

    chat.scrollTop = chat.scrollHeight;
  }

  function send() {
    const input = document.getElementById("reply-input");
    if (!input.value.trim()) return;

    addMessage("user", input.value);
    addMessage("bot", reply(input.value));

    input.value = "";
  }

  document.getElementById("reply-send").onclick = send;

  document.getElementById("reply-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });

  //////////////////////////////
  // UPDATE UI
  //////////////////////////////
  function updateUI() {
    document.getElementById("reply-header").innerText = config.name;
    button.style.background = config.color;
    document.getElementById("reply-send").style.background = config.color;
  }

  //////////////////////////////
  // START SYSTEM
  //////////////////////////////
  startSaaS();

})(window, document);
