import AboutSectionOne from "../../components/About/AboutSectionOne"
import ScrollUp from "../../components/Common/ScrollUp"
import Contact from "../../components/Contact"
import Features from "../../components/Features"
import Hero from "../../components/Hero"

export const metadata = {
    title: "ChainSavvy",
    description: "Smart Supply chain management using Blockchain"
    // other metadata
}

export default function Home() {
    return (
        <>
            <ScrollUp />
            <Hero />
            <Features />
            <AboutSectionOne />
            <Contact />
        </>
    )
}

