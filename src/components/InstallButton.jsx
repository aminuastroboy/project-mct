import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(
    () => JSON.parse(localStorage.getItem("showInstallButton")) ?? false
  );

  useEffect(() => {
    const handler = (e) => {
      console.log("📲 beforeinstallprompt fired", e);
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
      localStorage.setItem("showInstallButton", true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("User choice:", outcome);
    if (outcome === "accepted") {
      setShowButton(false);
      localStorage.setItem("showInstallButton", false);
    }
    setDeferredPrompt(null);
  };

  if (!showButton) return null;

  return (
    <div className="fixed bottom-20 right-6 sm:bottom-6 sm:right-6">
      <button
        onClick={handleInstall}
        className="bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg sm:px-6 sm:py-3"
      >
        📲 Install App
      </button>
    </div>
  );
}
