import { useState } from "react";

export const useLinkShare = () => {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState<boolean>(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopiedTooltip(true);

      setTimeout(() => {
        setShowCopiedTooltip(false);
      }, 2000);
    } catch (error) {
      console.error("Kopyalama xətası:", error);
      setShowCopiedTooltip(true);
      setTimeout(() => {
        setShowCopiedTooltip(false);
      }, 2000);
    }
  };
  return { showCopiedTooltip, handleShare };
};
