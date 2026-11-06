import { createReader } from '@keystatic/core/reader';
import { DocumentRenderer } from '@keystatic/core/renderer';
import keystaticConfig from '../../../../keystatic.config';
import { notFound } from 'next/navigation';
import s from '@/components/quiet/Quiet.module.css';
import Link from 'next/link';

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const posts = await reader.collections.posts.list();
  
  return posts.map((slug) => ({
    slug,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const reader = createReader(process.cwd(), keystaticConfig);
  const post = await reader.collections.posts.read(params.slug);
  
  if (!post) {
    notFound();
  }

  const contentNode = await post.content();

  return <article className={s.article}><Link href="/blog" className={s.quietLink}>← All writing</Link><header className={s.pageIntro}><p className={s.kicker}>{formatDate(post.date)} · {post.readTime}</p><h1>{post.title}</h1></header>{contentNode?<DocumentRenderer document={contentNode}/>:<p>Writing in progress.</p>}</article>;
}
