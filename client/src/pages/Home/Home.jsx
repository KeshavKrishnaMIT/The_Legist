import "./Home.css";
import TopHero from "./components/TopHero";
import Blogs from "../Blogs/Blogs";
import FAQSection from "./components/FAQSection";
import AboutPreview from "./components/AboutPreview";

export default function Home() {
  return (
    <div className="home-page">
      <TopHero />
      <Blogs />
      <FAQSection />
      <AboutPreview />
    </div>
  );
}
