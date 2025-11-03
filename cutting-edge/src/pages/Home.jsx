import HeroSection from "../components/HeroSection";
import EdgeBanding from "../components/EdgeBanding";
import PanelCutting from "../components/PanelCutting";
import CNCSection from "../components/CNCSection";

export default function Home() {
  return (
    <div className="pt-28 bg-richblack text-white">
      <HeroSection />
      <EdgeBanding />
      <PanelCutting />
      <CNCSection />
    </div>
  );
}
