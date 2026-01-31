import Hero from "@/components/Hero";
import JobCategories from "@/components/JobCategories";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import LatestJobs from "@/components/LatestJobs";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import BlogSection from "@/components/BlogSection";
import FeaturedJobs from "@/components/FeaturedJobs";

export default function Home() {
    return (
        <div className="bg-gray-50 flex flex-col min-h-screen">
            <Hero />
            <LatestJobs />
            <FeaturedJobs />
            <HowItWorks />
            <PricingPlans />
            <JobCategories />
            <StatsSection />
            <Testimonials />
            <FAQ />
            <BlogSection />
            <Newsletter />
        </div>
    );
}
