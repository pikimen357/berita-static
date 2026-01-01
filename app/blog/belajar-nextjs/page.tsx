import Heading from "@/components/Heading";
import { readFile } from "node:fs/promises";
import { marked } from "marked";
import { join } from "node:path";

export default async function Home() {
    const filePath = join(process.cwd(), 'content', 'blog' , 'belajar-nextjs.md');
    const text = await readFile(filePath, 'utf-8');

    const html = marked(text);

    return (
        <>
            <Heading title="Belajar Next JS" />
            <img src="/images/gedung.png"       className="rounded-lg shadow-md mb-5"
                width={600} height={400} />
            <article 
                dangerouslySetInnerHTML={{ __html: html }} 
                className="prose font-roboto max-w-none" 
                ></article>
        </>
    );
}