import { useState } from "react";
import "./HelpDeskEarl.css";

export default function HelpDeskEarl() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    { role: "earl", text: "Hello, my name is Earl, how may I help you today?" },
  ]);

  function send(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setMessages((current) => [
      ...current,
      { role: "user", text },
      { role: "earl", text: "Thanks — I’ll look into that. How else can I help?" },
    ]);
  }

  return (
    <div className="earl-helpdesk">
      {open ? (
        <div className="earl-panel" role="dialog" aria-label="Earl’s Help Desk">
          <div className="earl-panel-header">
            <img src="/earl-help-desk.jpg" alt="" />
            <strong>Earl’s Help Desk</strong>
          </div>
          <div className="earl-messages">
            {messages.map((message, index) => (
              <p key={index} className={`earl-bubble earl-bubble-${message.role}`}>
                {message.text}
              </p>
            ))}
          </div>
          <form className="earl-compose" onSubmit={send}>
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type a message…"
              aria-label="Message Earl"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        className="earl-toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <img src="/earl-help-desk.jpg" alt="" />
        Earl’s Help Desk
      </button>
    </div>
  );
}
