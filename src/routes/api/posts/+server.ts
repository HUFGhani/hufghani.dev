export const prerender = true;
import { type RequestHandler } from '@sveltejs/kit';

interface PostMetadata {
	title: string;
	description: string;
	date: string;
	categories: string[];
	published: boolean;
	slug: string;
}
export const GET: RequestHandler = async () => {
	try {
		let posts: PostMetadata[] = [];

		const paths = import.meta.glob('/src/posts/*.md', { eager: true }).m;

		for (const path in paths) {
			const file = paths[path];

			if (file && typeof file === 'object' && 'metadata' in file) {
				const metadata = file.metadata as PostMetadata;
				const slug = encodeURIComponent(metadata.slug);
				const post = { ...metadata, slug } satisfies PostMetadata;
				post.published && posts.push(post);
			}
		}

		posts = posts.sort(
			(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
		);

		return new Response(JSON.stringify(posts), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error loading blog post list:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
