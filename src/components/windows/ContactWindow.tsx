import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ContactWindow: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [composing, setComposing] = useState(false);
  const EMAIL = "roncy.bhatia@gmail.com";

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
    setComposing(false);
  };

  const contacts: { label: string; value: string; href: string; download?: string }[] = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { label: "LinkedIn", value: "linkedin.com/in/ronit-bhatia", href: "https://www.linkedin.com/in/ronit-bhatia/" },
    { label: "GitHub", value: "github.com/ronitbhatia", href: "https://github.com/ronitbhatia" },
    { label: "Resume", value: "Download Resume", href: "/resume.pdf", download: "resume.pdf" },
  ];

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast({ title: "Email copied", description: `${EMAIL} copied to clipboard.` });
    } catch {
      toast({
        title: "Could not copy email",
        description: "Opening your mail app anyway.",
        variant: "destructive",
      });
    }
    const mailto = `mailto:${EMAIL}`;
    window.location.href = mailto;
    window.open(mailto, "_self");
  };

  return (
    <div className="flex h-full contact-window">
      {/* Sidebar - Address Book / Mail sidebar */}
      <div
        className="w-44 flex-shrink-0 border-r flex flex-col window-sidebar-bg"
        style={{ borderColor: "hsl(var(--mac-border))" }}
      >
        {/* Mailboxes header */}
        <div
          className="px-3 py-2.5 border-b text-xs font-bold uppercase tracking-widest window-section-label"
          style={{
            fontFamily: "var(--font-mono)",
            borderColor: "hsl(var(--mac-border))",
            opacity: 0.8,
          }}
        >
          Mailboxes
        </div>

        {/* Folders */}
        {[
          { label: "Inbox", count: 3, active: !composing },
          { label: "Sent", count: 0, active: false },
          { label: "Compose", count: null, active: composing },
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
          className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest window-section-label"
          style={{ fontFamily: "var(--font-mono)", opacity: 0.8 }}
        >
          Social
        </div>
        {contacts.slice(1).map((c) => (
          <a
            key={c.label}
            href={c.href}
            download={c.download}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:opacity-80 rounded mx-1"
            style={{
              fontFamily: "var(--font-body)",
              color: "hsl(var(--mac-dark))",
            }}
          >
            <span>{c.label}</span>
          </a>
        ))}
      </div>

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Compose toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b window-chrome-bar" style={{ borderColor: "hsl(var(--mac-border))" }}>
          <button
            className="text-xs px-3 py-1.5 rounded border font-medium transition-colors"
            style={{
              background: composing ? "hsl(var(--mac-blue))" : "hsl(var(--window-input-bg-alt))",
              color: composing ? "white" : "hsl(var(--mac-dark))",
              borderColor: "hsl(var(--mac-border))",
              fontFamily: "var(--font-body)",
            }}
            onClick={() => setComposing(!composing)}
          >
            New Message
          </button>
          <span
            className="window-section-label text-xs"
            style={{ fontFamily: "var(--font-mono)", opacity: 0.85 }}
          >
            {composing ? "Composing new message..." : "Inbox - Open for opportunities!"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto mac-scroll">
          {composing ? (
            /* Compose form */
            <form onSubmit={handleSend} className="p-6 space-y-4">
              <div
                className="rounded-lg border overflow-hidden window-input-bg"
                style={{ borderColor: "hsl(var(--mac-border))" }}
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
                      className="contact-input-focus flex-1 px-2 py-2 text-xs outline-none bg-transparent rounded-sm transition-shadow"
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
                  className="contact-input-focus w-full px-4 py-3 text-xs outline-none resize-none bg-transparent rounded-sm transition-shadow"
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
                    background: "hsl(var(--window-input-bg-alt))",
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
                  Send Message
                </button>
              </div>

              {sent && (
                <div className="contact-success-toast flex items-center gap-3 py-3 px-4 rounded-xl border border-green-200/60 shadow-lg contact-success-animate" style={{ background: "hsl(142 72% 93%)", color: "hsl(142 72% 30%)", fontFamily: "var(--font-body)" }}>
                  <div className="contact-success-checkmark flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "hsl(142 72% 40%)", color: "white" }}>
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Message sent!</p>
                    <p className="text-xs opacity-90">I'll get back to you soon.</p>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* Inbox view */
            <div className="p-6">
              {/* Welcome email */}
              <div
                className="rounded-lg border mb-4 overflow-hidden window-input-bg"
                style={{
                  borderColor: "hsl(var(--mac-border))",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 border-b window-input-bg"
                  style={{ borderColor: "hsl(var(--mac-border))" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "hsl(207 89% 92%)", color: "hsl(var(--mac-dark))" }}
                  >
                    R
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                    >
                      Ronit Bhatia
                    </div>
                    <div className="contact-meta text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                      roncy.bhatia@gmail.com | Just now
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
                    Software Engineer & ML Enthusiast, building impactful solutions through thoughtful engineering.
                    Open to opportunities. Click "New Message" to reach out or use the links below!
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {contacts.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        download={c.download}
                        target={c.href.startsWith("http") || c.href.startsWith("mailto") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        onClick={c.label === "Email" ? handleEmailClick : undefined}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors hover:opacity-90 window-input-bg"
                        style={{ borderColor: "hsl(var(--mac-border))" }}
                      >
                        <div>
                          <div
                            className="text-xs font-semibold"
                            style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                          >
                            {c.label}
                          </div>
                          <div
                            className="contact-value text-xs"
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
