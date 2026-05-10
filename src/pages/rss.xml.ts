import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context: APIContext) {
	const posts = await getCollection('posts', (entry) => entry.data.draft === false);
	posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site ?? 'https://lettersfromthefloor.com',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.dek,
			pubDate: post.data.publishDate,
			link: `/posts/${post.id}/`,
		})),
	});
}
