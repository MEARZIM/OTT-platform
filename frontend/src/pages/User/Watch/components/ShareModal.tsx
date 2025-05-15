import { useEffect, useState } from "react";
import { Modal } from "../../../../components/ui/modal";
import { Button } from "../../../../components/ui/button";
import { Copy, Facebook, Twitter, Send, MessageCircleMore, Linkedin } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
}

const ShareModal = ({
  isOpen,
  onClose,
}: ShareModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Share this content"
      description="Share this content to anywhere"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* URL Box + Copy */}
        <div className="w-full bg-gray-300 text-black rounded-md flex items-center px-4 py-2 justify-between">
          <span className="truncate text-sm md:text-base">{currentUrl}</span>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        {copied && <p className="text-blue-700 text-sm">Link copied to clipboard!</p>}

        {/* Social Share Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition"
            title="Share on WhatsApp"
          >
            <MessageCircleMore className="w-5 h-5" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition"
            title="Share on Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-full p-3 transition"
            title="Share on Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 hover:bg-blue-500 text-white rounded-full p-3 transition"
            title="Share on Telegram"
          >
            <Send className="w-5 h-5" />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0077b5] hover:bg-[#006097] text-white rounded-full p-3 transition"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Cancel */}
        <div className="pt-4 flex items-center justify-end w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
