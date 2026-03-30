import { Bot, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

const QUICK_REPLIES = [
  "Products dekhen",
  "Order kaise karein",
  "Price poochein",
  "Order Track karein",
];

function getBotResponse(input: string): string {
  const msg = input.toLowerCase().trim();
  if (/\b(hi|hello|namaste|hii|hey|namaskar)\b/.test(msg)) {
    return "Namaste! Main Mega Bags ka assistant hoon. Aap products, orders, ya pricing ke baare mein pooch sakte hain. \uD83D\uDE4F";
  }
  if (
    /\b(products|bags|range|product|bag)\b/.test(msg) ||
    msg.includes("products dekhen")
  ) {
    return "Hamare products:\n\u2022 Valve Paper Bags\n\u2022 Open Mouth Paper Bags\n\u2022 Multiwall Paper Bags\n\u2022 HDPE Laminated Paper Bags\n\u2022 Aluminium Foil Bags\n\nKisi bhi product ke baare mein detail ke liye Our Range page visit karein.";
  }
  if (
    /\b(price|cost|rate|kitna|pricing|daam)\b/.test(msg) ||
    msg.includes("price poochein")
  ) {
    return "Pricing bulk quantity par depend karti hai. Minimum order 1000 bags hai. Direct quote ke liye WhatsApp karein ya Contact page pe jaayein. \uD83D\uDCB0";
  }
  if (
    /\b(order|kaise order|order kaise|place order|order karna|booking)\b/.test(
      msg,
    ) ||
    msg.includes("order kaise karein")
  ) {
    return "Order place karne ke liye Place Order page pe jaayein. Minimum quantity 1000 bags hai. Form fill karein aur Order ID generate hogi. \uD83D\uDCE6";
  }
  if (
    /\b(track|status|order status|kahan|tracking)\b/.test(msg) ||
    msg.includes("order track karein")
  ) {
    return "Apna Order ID enter karein Track Order page pe apna status check karne ke liye. Order ID format: MB12345 \uD83D\uDD0D";
  }
  if (/\b(contact|phone|address|location|call|email|number)\b/.test(msg)) {
    return "Aap Contact Us page pe jaayein ya seedha WhatsApp karein. \uD83D\uDCDE\n\nAddress: Industrial Area, Pune, Maharashtra\nPhone: +91 98765 43210\nEmail: info@megabags.in";
  }
  if (/\b(minimum|min order|moq|quantity)\b/.test(msg)) {
    return "Hamari minimum order quantity (MOQ) 1000 bags hai. Bulk orders ke liye special pricing milti hai! \uD83D\uDCCA";
  }
  return "Sorry, main samajh nahi paya. \uD83D\uDE05 Aap WhatsApp pe message karein ya Contact page use karein.";
}

let msgCounter = 0;
function genId() {
  msgCounter += 1;
  return `msg_${msgCounter}`;
}

const WELCOME_MSG: Message = {
  id: "msg_0",
  text: "Namaste! \uD83D\uDE4F Main Mega Bags Assistant hoon. Kaise madad kar sakta hoon?",
  sender: "bot",
};

function scrollToBottom(ref: React.RefObject<HTMLDivElement | null>) {
  ref.current?.scrollIntoView({ behavior: "smooth" });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll when chat opens
  useEffect(() => {
    if (open) scrollToBottom(messagesEndRef);
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: genId(), text: text.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const botReply: Message = {
        id: genId(),
        text: getBotResponse(text),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
      setTyping(false);
      setTimeout(() => scrollToBottom(messagesEndRef), 50);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div
      className="fixed bottom-36 right-4 md:bottom-24 md:right-6 z-50"
      data-ocid="chatbot.panel"
    >
      {open && (
        <div
          className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ maxHeight: "480px" }}
        >
          <div className="flex items-center gap-3 bg-[#0E5A7A] px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-sm">
                Mega Bags Assistant
              </div>
              <div className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              data-ocid="chatbot.close_button"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50"
            style={{ minHeight: "220px", maxHeight: "300px" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-[#0E5A7A] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-[#0E5A7A] text-white rounded-br-sm"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-[#0E5A7A] flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1 items-center">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    type="button"
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="text-xs bg-white border border-[#0E5A7A] text-[#0E5A7A] hover:bg-[#0E5A7A] hover:text-white transition-colors px-3 py-1.5 rounded-full font-medium shadow-sm"
                    data-ocid="chatbot.button"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 bg-white border-t border-gray-100"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Apna sawal likhein..."
              className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-full outline-none focus:border-[#0E5A7A] focus:ring-1 focus:ring-[#0E5A7A]/20 transition-all bg-gray-50"
              data-ocid="chatbot.input"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-[#0E5A7A] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0B3D63] transition-colors flex-shrink-0"
              data-ocid="chatbot.submit_button"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative w-14 h-14 rounded-full bg-[#0E5A7A] hover:bg-[#0B3D63] text-white shadow-2xl shadow-blue-900/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ml-auto"
        aria-label="Open AI chatbot"
        data-ocid="chatbot.open_modal_button"
      >
        {open ? <X size={24} /> : <Bot size={24} />}
        {!open && (
          <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#F97316] border-2 border-white" />
        )}
      </button>
    </div>
  );
}
