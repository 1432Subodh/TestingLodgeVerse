import Hero from "@/components/component-ui/hero-section/Hero";
import SecondSection from "../components/component-ui/second-section/SecondSection";


export default function Home() {
  return (
    <div>
      <Hero />
      <SecondSection />
      <video src="video/back-video.webm" autoPlay muted playsInline className=" dark:mix-blend-difference mix-blend-exclusion w-full sm:h-[100vh] h-[70vh] object-cover fixed -z-10 top-0 ">
      </video>
    </div>
  );
}
