import "./App.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectView from "./pages/ProjectView";
import Footer from "./pages/miniComponents/Footer";
import { Toaster } from 'sonner'
import {ModeToggle} from "./components/ModeToggle";


export default function App() {
 

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
      <Toaster />
        <ModeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>
        <Footer />
       
      </Router>
    </ThemeProvider>
  );
}
