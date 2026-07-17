import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PresentationShell } from "./components/presentation/PresentationShell";

function App() {
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
