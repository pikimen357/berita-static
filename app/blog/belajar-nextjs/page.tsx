import Heading from "@/components/Heading";

export default function Home() {
    return (
        <>
            <Heading title="Belajar Next JS" />
            <img src="/images/gedung.png" className="rounded-lg shadow-md mb-5"
                width={600} height={400} />
            <p>Kita akan belajar next js bersama pakarnya</p>
        </>
    );
}