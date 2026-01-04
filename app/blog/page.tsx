import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/post";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Berita",
    description: "Belajar Next.js Fundamental dari dasar hingga mahir",
};

interface BlogPost {
    title: string;
    slug: string;
    description: string;
    image: string;
    date: string;
    author: string;
}

export default async function Home() {
    const allPosts = await getAllPosts();
    
    const blogPosts: BlogPost[] = allPosts.map(post => ({
        title: post.title,
        slug: post.slug,
        description: post.description,
        image: post.image,
        date: post.date,
        author: post.author
    }));

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
            <Heading title="This is Blog" />
            <p className="mt-4 text-gray-600 text-lg font-medium">List of blog</p>

            <div className="mt-8 space-y-4">
                {blogPosts.map((post: BlogPost, index: number) => (
                    <PostCard
                        key={index}
                        title={post.title}
                        href={`/blog/${post.slug}`}
                        description={post.description}
                        image={post.image}
                        date={post.date}
                        author={post.author}
                    />
                ))}
            </div>
        </div>
    );
}