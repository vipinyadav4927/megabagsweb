import { useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=Hello%20Mega%20Bags%2C%20I%20want%20to%20enquire%20about%20your%20products";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2"
      data-ocid="whatsapp.button"
    >
      {hovered && (
        <div className="relative bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
          Chat on WhatsApp
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
        </div>
      )}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping" />
        <span className="absolute inset-[-4px] rounded-full border-2 border-green-400 opacity-40" />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/40 transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
            role="img"
            aria-label="WhatsApp"
          >
            <path d="M12.001 2C6.477 2 2.002 6.475 2.002 12c0 1.857.502 3.594 1.376 5.09L2 22l5.085-1.35A9.946 9.946 0 0012 22c5.523 0 9.999-4.477 9.999-10S17.524 2 12.001 2zm0 18.182a8.16 8.16 0 01-4.28-1.208l-.308-.183-3.018.802.81-2.965-.2-.307A8.144 8.144 0 013.82 12c0-4.51 3.671-8.182 8.181-8.182S20.182 7.49 20.182 12s-3.67 8.182-8.181 8.182zm4.49-6.115c-.246-.124-1.455-.718-1.68-.8-.225-.082-.39-.123-.553.124-.163.246-.635.8-.778.965-.143.163-.286.184-.532.061-.246-.123-1.04-.384-1.98-1.22-.731-.652-1.225-1.457-1.368-1.703-.143-.247-.015-.38.108-.503.11-.11.246-.286.368-.43.123-.143.163-.246.245-.41.082-.163.041-.307-.02-.43-.062-.123-.554-1.335-.758-1.827-.2-.48-.402-.415-.553-.422l-.47-.008c-.164 0-.43.062-.654.308-.225.246-.86.84-.86 2.048s.88 2.375 1.002 2.539c.123.163 1.73 2.64 4.19 3.702.586.254 1.042.406 1.398.52.587.188 1.122.161 1.545.098.472-.07 1.455-.594 1.66-1.168.205-.575.205-1.068.143-1.17-.06-.103-.225-.165-.47-.288z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
