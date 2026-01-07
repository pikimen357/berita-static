import { marked } from "marked";
import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import qs  from "qs";
import { writeFileSync } from "fs";

const baseUrl: string = process.env.BASE_URL;
const apiUrl:  string = baseUrl + 'api';

export async function getPost(slug: string) : Promise<{ slug: string; title: string; image: string; description: string; date: string; author: string; body: string; rate: string }> {

    const  url: string  =  `${apiUrl}/posts` + '?' + qs.stringify({
        filters : { slug: { $eq: slug } },
        fields : ['slug','title', 'description', 'publishedAt','author', 'body', 'rate'],
        populate: { image : {fields: 'url'} },
        pagination: { pageSize: 1, withCount: false }
    },
    { 
        encodeValuesOnly: true 
    });

    const response: Response = await fetch(url);
    const { data } = await response.json();
    
    const dataItem: any = data[0];

    if (!dataItem) {
        throw new Error(`Post dengan slug "${slug}" tidak ditemukan`);
    }

    const imagePath: string = dataItem.image?.formats?.thumbnail?.url 
                                    || dataItem.image?.url 
                                    || '';

    // Pastikan path dimulai dengan /
    const cleanPath: string = imagePath.startsWith('/') ? imagePath : '/' + imagePath;

    const dateString = dataItem.publishedAt ? dataItem.publishedAt.slice(0, "yyyy-MM-DD".length) : '';
    const htmlBody = dataItem.body ? await marked(dataItem.body) : '';

    // console.log('Fetched post data:', dataItem);

    return {
            slug: dataItem.slug,
            title: dataItem.title,
            image: baseUrl?.replace(/\/$/, '') + cleanPath,
            author: dataItem.author,
            description: dataItem.description,
            date: dateString,
            body: htmlBody,
            rate: dataItem.rate 
    }
}

export async function getAllPosts(): Promise<Array<{ slug: string; title: string; description: string; image: string; date: string; author: string }>> {

    const  url: string  =  `${apiUrl}/posts` + '?' + qs.stringify({
        fields : ['slug','title', 'description', 'publishedAt','author', 'body'],
        populate: { image : {fields: 'url'} },
        sort: ['publishedAt:desc'],
        // pagination: { pageSize: 1 }
    },
    { 
        encodeValuesOnly: true 
    });

    const response: Response = await fetch(url);
    const { data } = await response.json();

    const posts: Array<{ slug: string; title: string; description: string; image: string; date: string; author: string }> = data.map((item: any) => {

        const imagePath: string = item.image?.formats?.thumbnail?.url 
                                        || item.image?.url 
                                        || '';

        // Pastikan path dimulai dengan /
        const cleanPath: string = imagePath.startsWith('/') ? imagePath : '/' + imagePath;

        return {
                slug: item.slug,
                title: item.title,
                author: item.author,
                description: item.description,
                image: baseUrl?.replace(/\/$/, '') + cleanPath,
                date: item.publishedAt.slice(0,"yyyy-MM-DD".length)
            };
    });

    return posts;
}

// fungsi untuk mendapatkan semua slug dari postingan
export async function getSlugs() {

    const files = await readdir(`./content/blog`);

    return files.filter(file => file.endsWith('.md'))
                .map(file => file.replace('.md', ''));
}

