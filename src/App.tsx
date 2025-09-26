import Header from "@/components/Header.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter basename="/neon-anime/">
        <Header />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
