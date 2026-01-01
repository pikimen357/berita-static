import Heading from "@/components/Heading";
import { readFile } from "node:fs/promises";
import { marked } from "marked";
import { join } from "node:path";
import matter from "gray-matter";

export default async function Home() {
    const filePath = join(process.cwd(), 'content', 'blog' , 'belajar-nextjs.md');
    const text = await readFile(filePath, 'utf-8');

    const { content, data: { title, image, date, authors } }  = matter(text);

    const html = marked(content);


    // console.log(data);

    return (
        <>
            <Heading title={title} />
            <p className="italic text-sm pb-2">{date} - {authors}</p>
            <img src={image}      className="rounded-lg shadow-md mb-5"
                width={600} height={400} />
            <article 
                dangerouslySetInnerHTML={{ __html: html }} 
                className="prose font-roboto max-w-none" 
                ></article>
        </>
    );
}