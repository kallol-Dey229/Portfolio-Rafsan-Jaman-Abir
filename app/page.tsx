import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import ScrollUI from "@/components/ScrollUI";
import CommandPalette from "@/components/CommandPalette";
import RestaurantWork from "@/components/RestaurantWork";
import PersonalWork from "@/components/PersonalWork";



export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Header />
      <ScrollUI />
      <CommandPalette />
      <main>
        <Hero />
        <About />
        <RestaurantWork />
        <PersonalWork />
        <Education />
        <Hobbies />
        <Contact />
      </main>
    </main>
  );
}