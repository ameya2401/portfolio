import HeadingWords from '@/components/quiet/HeadingWords';
import type { Metadata } from "next";
import { Arrow } from "@/components/quiet/Icons";
import styles from "@/components/quiet/Quiet.module.css";
import Link from "next/link";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import staticPosts from "@/data/blog";

export const metadata: Metadata = {
  title: "Writing · Ameya Bhagat",
  alternates: { canonical: "/blog" },
};

function formatDate(value: string) {
  const plainDate = value.match(/^([A-Za-z]+) (\d{1,2}), (\d{4})$/);
  const date = new Date(plainDate ? `${value} 12:00:00 UTC` : value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
}

export default async function Blog() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const bySlug = new Map(staticPosts.map((post) => [post.slug, post]));
  try {
    const entries = await reader.collections.posts.all();
    for (const { slug, entry } of entries)
      bySlug.set(slug, {
        id: slug as unknown as number,
        title: entry.title,
        excerpt: entry.excerpt,
        date: entry.date,
        readTime: entry.readTime,
        slug,
        tags: [entry.tag],
      });
  } catch (error) {
    console.error("Could not read local posts:", error);
  }
  const posts = Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return <><header className={styles.pageIntro}><p className={styles.kicker}>Writing</p><h1><HeadingWords text="Notes from making things"/></h1><p>On design, building products, and life beyond the screen.</p></header><div className={styles.writingList}><Link href="/blog/if-you-want-a-good-ui" className={styles.writingEntry}><div className={styles.writingMeta}>Draft</div><h2>If you want a good UI, try this</h2><p>A few checks for typography, spacing, content, and the way an interface responds.</p></Link>{posts.map(post=>{const content=<><div className={styles.writingMeta}><time>{formatDate(post.date)}</time>{post.readTime&&<><span>·</span><span>{post.readTime}</span></>}{post.link&&<><span>·</span><span>Medium</span></>}</div><h2>{post.title} {post.link&&<Arrow/>}</h2><p>{post.excerpt}</p></>;return post.link?<a className={styles.writingEntry} href={post.link} key={post.slug} target="_blank" rel="noreferrer">{content}</a>:<Link className={styles.writingEntry} href={`/blog/${post.slug}`} key={post.slug}>{content}</Link>})}</div></>;
}
