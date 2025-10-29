import { useEffect } from "react";

// Закриває модалку при натисканні Escape
export const useCloseOnEsc = (onClose) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
};

// Блокує прокрутку body під час відкритої модалки
export const useLockBodyScroll = () => {
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};

// Автоматично закриває модалку після логіну
export const useAutoCloseOnAuth = (isAuthenticated, onClose) => {
  useEffect(() => {
    if (isAuthenticated) onClose();
  }, [isAuthenticated, onClose]);
};
