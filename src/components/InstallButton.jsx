import React, { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    const beforeInstallHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const installedHandler = () => {
      setInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (installed || dismissed) return null;

  return (
    <>
      {/* Desktop / Tablet pill button */}
      <div className="hidden sm:flex fixed bottom-6 right-6">
        <button
          onClick={handleInstall}
          className="bg-pink-600 text-white px-4 py-2 rounded-full shadow-md animate-pulse"
        >
          📲 Install
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>

      {/* Mobile floating round button */}
      <div className="sm:hidden fixed bottom-20 right-6">
        <button
          onClick={handleInstall}
          className="bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-md animate-pulse"
        >
          📲
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-2 -right-2 bg-white rounded-full text-gray-600 w-6 h-6 flex items-center justify-center shadow"
        >
          ✖
        </button>
      </div>
    </>
  );
}
