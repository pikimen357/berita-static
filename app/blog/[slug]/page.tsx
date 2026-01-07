import ShareLinkButton from "@/components/ShareLinkButton";
import Heading from "@/components/Heading";
import { getAllPosts, getPost, getSlugs } from "@/lib/post";
import { Metadata } from "next";
import { JSX } from "react";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await props.params;
    const post = await getPost(slug);

    return {
        title: post.title,
        description: post.description,
        icons: {
            icon: post.image,
        },
    };
}

export default async function Home(props: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
    const { slug } = await props.params;

    const post = await getPost(slug);

    return (
        <>
            <Heading title={post.title} />
            <div className="flex flex-row gap-5 pb-2 items-end">
                <div className="flex flex-col gap-1">
                    <p className="italic text-sm -mb-0.5">{post.date} - {post.author}</p>
                    <p className="italic text-sm -mb-1">Rate: {post.rate}</p>
                </div>
                <ShareLinkButton />
            </div>
            <img src={post.image}      className="rounded-lg shadow-md mb-5"
                width={600} height={400} />
            <article 
                dangerouslySetInnerHTML={{ __html: post.body }} 
                className="prose font-roboto max-w-none" 
            ></article>
        </>
    );
}