import Heading from "@/components/Heading";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Belajar Next.js",
    description: "Belajar Next.js Fundamental dari dasar hingga mahir",
    icons: {
        icon: "/images/round.jpeg",
    },
};

export default function Home() {
    return (
        <>
            <Heading title="Welcome to Next.js Fundamental!" />
            <p>Hello </p>
        </>
    );
}