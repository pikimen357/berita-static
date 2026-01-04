import Heading from "../../components/Heading";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "Belajar Next.js Fundamental dari dasar hingga mahir",
};

export default function About() {
    return (
        <>
            <Heading title="About" />
            <p>About This Company</p>
        </>
    );
}