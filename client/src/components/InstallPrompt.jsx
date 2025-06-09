import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Prevent default mini bar
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white p-4 shadow-xl border rounded-xl z-50 max-w-xs">
      <p className="text-sm mb-2 font-semibold text-gray-800">
        Install Greencart for a better experience!
      </p>
      <button
        onClick={handleInstallClick}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
      >
        Install App
      </button>
    </div>
  );
};

export default InstallPrompt;
