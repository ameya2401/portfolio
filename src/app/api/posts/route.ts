import { NextResponse } from 'next/server';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../../keystatic.config';
import staticPosts from '@/data/blog';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const reader = createReader(process.cwd(), keystaticConfig);
    const keystaticPosts = await reader.collections.posts.all();
    const localPosts = keystaticPosts.map(p => ({
      id: p.slug,
      title: p.entry.title,
      excerpt: p.entry.excerpt,
      date: p.entry.date,
      readTime: p.entry.readTime,
      slug: p.slug,
      tags: [p.entry.tag]
    }));
    const allPosts = [...localPosts, ...staticPosts];
    
    // Sort by date descending (newest first)
    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Error fetching combined posts:', error);
    return NextResponse.json(staticPosts);
  }
}
