import { marked } from "marked";
import {  readdir } from "node:fs/promises";
import qs  from "qs";

const baseUrl: string = process.env.BASE_URL;
const apiUrl:  string = baseUrl + 'api';

interface FetchPostsParams {
    fields?: string[];
    filters?: Record<string, any>;
    populate?: Record<string, any>;
    sort?: string[];
    pagination?: {
        pageSize: number;
        withCount?: boolean;
    };
}

interface StrapiPost {
    slug: string;
    title: string;
    description: string;
    author: string;
    publishedAt: string;
    body?: string;
    rate?: string;
    image?: {
        url?: string;
        formats?: {
            thumbnail?: {
                url: string;
            };
        };
    };
}

interface Post {
    slug: string;
    title: string;
    image: string;
    description: string;
    date: string;
    author: string;
    body?: string;
    rate?: string;
}

export async function getPost(slug: string): Promise<Post> {

    const data = await fetchPosts({
        filters : { slug: { $eq: slug } },
        fields : ['slug','title', 'description', 'publishedAt','author', 'body', 'rate'],
        populate: { image : {fields: 'url'} },
        pagination: { pageSize: 1, withCount: false }
    });
    
    const dataItem: StrapiPost = data[0];

    if (!dataItem) {
        throw new Error(`Post dengan slug "${slug}" tidak ditemukan`);
    }

    return await toPost(dataItem, true);
}

export async function getAllPosts(): Promise<Array<Post>> {

    const data = await fetchPosts({
        fields : ['slug','title', 'description', 'publishedAt','author'],
        populate: { image : {fields: 'url'} },
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 3}
    });

    const posts: Promise<Post>[] = data.map((item: StrapiPost) => toPost(item, false));
    
    return await Promise.all(posts);
}


async function fetchPosts(parameters: FetchPostsParams): Promise<Array<any>> {
    const  url: string  =  `${apiUrl}/posts` + '?' + 
    qs.stringify(parameters, { encodeValuesOnly: true });

    const response: Response = await fetch(url);
    const { data } = await response.json();
    
    return data;
}


async function toPost(item: StrapiPost, isFullPost: boolean = false): Promise<Post> {
    const imagePath: string = item.image?.formats?.thumbnail?.url 
                                    || item.image?.url 
                                    || '';

    // Pastikan path dimulai dengan /
    const cleanPath: string = imagePath.startsWith('/') ? imagePath : '/' + imagePath;

    const dateString = item.publishedAt ? item.publishedAt.slice(0, "yyyy-MM-DD".length) : '';
    const htmlBody = isFullPost && item.body ? await marked(item.body) : '';

    return {
        slug: item.slug,
        title: item.title,
        image: baseUrl?.replace(/\/$/, '') + cleanPath,
        author: item.author,
        description: item.description,
        date: dateString,
        ...(isFullPost && { body: htmlBody, rate: item.rate })
    };
}

export async function getSlugs(): Promise<string[]> {
    const data = await fetchPosts({
        fields : ['slug'],
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 100}
    });

    return data.map((item: StrapiPost) => item.slug);
}