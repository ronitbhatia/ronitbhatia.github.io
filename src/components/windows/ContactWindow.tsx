import React, { useState } from "react";

const ContactWindow: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [composing, setComposing] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
    setComposing(false);
  };

  const contacts = [
    { icon: "📧", label: "Email", value: "alex@example.com", href: "mailto:alex@example.com" },
    { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/alexchen", href: "https://linkedin.com" },
    { icon: "🐙", label: "GitHub", value: "github.com/alexchen", href: "https://github.com" },
    { icon: "🐦", label: "Twitter", value: "@alexchen_dev", href: "https://twitter.com" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar – Address Book / Mail sidebar */}
      <div
        className="w-44 flex-shrink-0 border-r flex flex-col"
        style={{
          background: "hsl(0 0% 90%)",
          borderColor: "hsl(var(--mac-border))",
        }}
      >
        {/* Mailboxes header */}
        <div
          className="px-3 py-2.5 border-b text-xs font-bold uppercase tracking-widest opacity-40"
          style={{
            fontFamily: "var(--font-mono)",
            borderColor: "hsl(var(--mac-border))",
          }}
        >
          Mailboxes
        </div>

        {/* Folders */}
        {[
          { icon: "📥", label: "Inbox", count: 3, active: !composing },
          { icon: "📤", label: "Sent", count: 0, active: false },
          { icon: "✏️", label: "Compose", count: null, active: composing },
        ].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-2 px-3 py-2 text-left transition-all"
            style={{
              background: item.active ? "hsl(var(--mac-blue))" : "transparent",
              color: item.active ? "white" : "hsl(var(--mac-dark))",
              fontFamily: "var(--font-body)",
            }}
            onClick={() => setComposing(item.label === "Compose")}
          >
            <span>{item.icon}</span>
            <span className="text-xs font-medium flex-1">{item.label}</span>
            {item.count !== null && item.count > 0 && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: item.active ? "rgba(255,255,255,0.3)" : "hsl(var(--mac-blue))",
                  color: item.active ? "white" : "white",
                  fontSize: "10px",
                }}
              >
                {item.count}
              </span>
            )}
          </button>
        ))}

        <div className="retro-divider mx-3" />

        {/* Contact links */}
        <div
          className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest opacity-40"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Social
        </div>
        {contacts.slice(1).map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:bg-blue-100 rounded mx-1"
            style={{
              fontFamily: "var(--font-body)",
              color: "hsl(var(--mac-dark))",
            }}
          >
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </a>
        ))}
      </div>

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Compose toolbar */}
        <div
          className="flex items-center gap-2 px-4 py-2 border-b"
          style={{
            background: "hsl(var(--mac-window-chrome))",
            borderColor: "hsl(var(--mac-border))",
          }}
        >
          <button
            className="text-xs px-3 py-1.5 rounded border font-medium transition-colors"
            style={{
              background: composing ? "hsl(var(--mac-blue))" : "hsl(0 0% 94%)",
              color: composing ? "white" : "hsl(var(--mac-dark))",
              borderColor: "hsl(var(--mac-border))",
              fontFamily: "var(--font-body)",
            }}
            onClick={() => setComposing(!composing)}
          >
            ✏️ New Message
          </button>
          <span
            className="text-xs opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {composing ? "Composing new message..." : "Inbox – Open for opportunities!"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto mac-scroll">
          {composing ? (
            /* Compose form */
            <form onSubmit={handleSend} className="p-4 space-y-3">
              <div
                className="rounded-lg border overflow-hidden"
                style={{
                  background: "hsl(0 0% 99%)",
                  borderColor: "hsl(var(--mac-border))",
                }}
              >
                {/* Email-style header fields */}
                {[
                  { label: "From:", value: form.name, key: "name", placeholder: "Your name", type: "text" },
                  { label: "Reply-To:", value: form.email, key: "email", placeholder: "your@email.com", type: "email" },
                  { label: "Subject:", value: form.subject, key: "subject", placeholder: "What's this about?", type: "text" },
                ].map((field) => (
                  <div
                    key={field.key}
                    className="flex items-center border-b"
                    style={{ borderColor: "hsl(var(--mac-border))" }}
                  >
                    <span
                      className="px-3 text-xs font-medium opacity-50 w-20 flex-shrink-0"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {field.label}
                    </span>
                    <input
                      type={field.type}
                      className="flex-1 px-2 py-2 text-xs outline-none bg-transparent"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      required
                    />
                  </div>
                ))}

                {/* Message body */}
                <textarea
                  className="w-full px-4 py-3 text-xs outline-none resize-none bg-transparent"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "hsl(var(--mac-dark))",
                    minHeight: "140px",
                  }}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="text-xs px-4 py-2 rounded border font-medium"
                  style={{
                    borderColor: "hsl(var(--mac-border))",
                    fontFamily: "var(--font-body)",
                    background: "hsl(0 0% 94%)",
                    color: "hsl(var(--mac-dark))",
                  }}
                  onClick={() => setComposing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs px-5 py-2 rounded font-semibold transition-all"
                  style={{
                    background: "hsl(var(--mac-blue))",
                    color: "white",
                    fontFamily: "var(--font-body)",
                    boxShadow: "0 2px 8px hsl(207 89% 54% / 0.35)",
                  }}
                >
                  📤 Send Message
                </button>
              </div>

              {sent && (
                <div
                  className="text-xs text-center py-2 px-3 rounded-lg font-medium"
                  style={{
                    background: "hsl(142 72% 93%)",
                    color: "hsl(142 72% 30%)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}
            </form>
          ) : (
            /* Inbox view */
            <div className="p-4">
              {/* Welcome email */}
              <div
                className="rounded-lg border mb-4 overflow-hidden"
                style={{
                  background: "hsl(0 0% 99%)",
                  borderColor: "hsl(var(--mac-border))",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 border-b"
                  style={{ borderColor: "hsl(var(--mac-border))", background: "hsl(0 0% 97%)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                    style={{ background: "hsl(207 89% 92%)" }}
                  >
                    👋
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                    >
                      Alex Chen
                    </div>
                    <div className="text-xs opacity-50" style={{ fontFamily: "var(--font-mono)" }}>
                      alex@example.com • Just now
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p
                    className="text-sm font-semibold mb-2"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    Hey, let's build something great together.
                  </p>
                  <p
                    className="text-xs leading-relaxed opacity-70 mb-4"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    I'm always interested in exciting projects, challenging problems, and great teams.
                    Whether you're hiring, have a freelance project, or just want to chat about
                    tech — my inbox is open. Click "New Message" to reach out!
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {contacts.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors hover:bg-blue-50"
                        style={{
                          borderColor: "hsl(var(--mac-border))",
                          background: "hsl(0 0% 97%)",
                        }}
                      >
                        <span className="text-base">{c.icon}</span>
                        <div>
                          <div
                            className="text-xs font-semibold"
                            style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                          >
                            {c.label}
                          </div>
                          <div
                            className="text-xs opacity-50"
                            style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}
                          >
                            {c.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
