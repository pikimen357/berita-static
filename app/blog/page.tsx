import Link from "next/link";
import Heading from "@/components/Heading";

export default function Home() {
    return (
        <>
            <Heading title="This is Blog" />
            <p>List of blog</p>
            <ul>
                <li>
                    <Link href="/blog/belajar-nextjs">Post </Link>
                </li>
                <li>
                    <Link href="/blog/latihan-route-next">Latihan Route</Link>
                </li>
            </ul>
        </>
    );
}