import { Hero } from "@/components/hero";
import { Navbar } from "../components/navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-black dark">
      <Navbar />
      <Hero />
    </div>
  );
}
