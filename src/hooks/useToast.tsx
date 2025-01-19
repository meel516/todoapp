import { useEffect, useState } from "react";

const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setToastMessage] = useState("sample toast");
  const [mode, setMode] = useState("error");

  const triggerToast = (msg, mode) => {
    setToastMessage(msg);
    setMode(mode);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => setShowToast(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  return {
    showToast,
    triggerToast,
    message,
    mode,
  };
};

export default useToast;