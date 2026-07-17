import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PresentationShell } from "./components/presentation/PresentationShell";
import { PresenterView } from "./components/presentation/PresenterView";

function App() {
  const [isPresenterWindow, setIsPresenterWindow] = useState(() => window.location.hash === "#/presenter");

  useEffect(() => {
    const onHashChange = () => setIsPresenterWindow(window.location.hash === "#/presenter");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (isPresenterWindow) {
    return <PresenterView />;
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <PresentationShell />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
