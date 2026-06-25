import DestinationsGrid from "@/components/home/DestinationsGrid";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import Hero from "@/components/home/Hero";
import LiveChat from "@/components/home/LiveChat";
import PopularSearches from "@/components/home/PopularSearches";
import TravelExperience from "@/components/home/TravelExperience";
import LatestBlog from "@/components/shared/LatestBlog";
import NewsletterFooter from "@/components/shared/NewsletterFooter";
import Sponsors from "@/components/shared/Sponsors";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">
        <Hero></Hero>
        <FeaturedPackages></FeaturedPackages>
        <PopularSearches></PopularSearches>
        <TravelExperience></TravelExperience>
        <DestinationsGrid></DestinationsGrid>
        <LiveChat></LiveChat>
        {/* <Sponsors></Sponsors> */}
        <NewsletterFooter></NewsletterFooter>
        <LatestBlog></LatestBlog>
   
      </h1>
    </main>
  );
}