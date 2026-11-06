import mediumPosts from './medium-posts.json';
export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    slug: string;
    tags: string[];
    link?: string;
}

const posts: BlogPost[] = [
    {
        id: 1,
        title: "Why we force people to watch the things we love",
        excerpt: "It's sad that we can't watch a film again for the first time. Exploring the psychology of shared experiences and why we crave that connection.",
        date: "May 20, 2025",
        readTime: "4 min read",
        slug: "force-watch-things-we-love",
        tags: ["Psychology", "Cinema"],
        link: "https://medium.com/write-a-catalyst/why-we-force-people-to-watch-the-things-we-love-ec55e2cc66f6"
    },
    {
        id: 2,
        title: "This ChatGPT Prompt Will Change Your Life",
        excerpt: "Unlocking the full potential of AI with a single, powerful prompt structure that I use daily.",
        date: "May 15, 2025",
        readTime: "3 min read",
        slug: "chatgpt-prompt-change-life",
        tags: ["AI", "Productivity"],
        link: "https://github.com/ameya2401"
    },
    {
        id: 3,
        title: "The $20k Growth Consultant Prompt: Turning ChatGPT into Your Strategy Partner",
        excerpt: "How to stop using AI for generic advice and start using it to build high-level business strategies.",
        date: "May 10, 2025",
        readTime: "5 min read",
        slug: "20k-growth-consultant-prompt",
        tags: ["AI", "Strategy"],
        link: "https://medium.com/write-earn/the-20k-growth-consultant-prompt-turning-chatgpt-into-your-strategy-partner-aa7078cd5a4f"
    },
    {
        id: 4,
        title: "10 Brutal Lessons from 6 Months of 'Vibe Coding' and Launching AI Startups",
        excerpt: "The reality of building in the AI era. It's not about the code anymore, it's about the taste, the speed, and the resilience.",
        date: "May 5, 2025",
        readTime: "7 min read",
        slug: "10-brutal-lessons-ai-startups",
        tags: ["Startups", "Coding"],
        link: "https://github.com/ameya2401"
    },
    {
        id: 5,
        title: "How I Used AI to Learn Books 10x Faster",
        excerpt: "Reading cover-to-cover is outdated. Here's a system to extract the core mental models from books using AI, without losing the nuance.",
        date: "Apr 28, 2025",
        readTime: "6 min read",
        slug: "learn-books-10x-faster-ai",
        tags: ["Learning", "Productivity"],
        link: "https://medium.com/write-a-catalyst/how-i-used-ai-to-learn-books-10x-faster-without-reading-every-page-3b305c697225"
    },
    {
        id: 6,
        title: "Why Doing Nothing Might Be the Smartest Thing You Do",
        excerpt: "In a world obsessed with output, strategic stillness is the ultimate competitive advantage. The case for 'Niksen'.",
        date: "Apr 20, 2025",
        readTime: "4 min read",
        slug: "why-doing-nothing-is-smart",
        tags: ["Wellness", "Philosophy"],
        link: "https://medium.com/write-earn/why-doing-nothing-might-be-the-smartest-thing-you-do-de3460ffb197"
    },
    {
        id: 7,
        title: "When Love Redefines You (And How You Deal When It's Over)",
        excerpt: "A personal essay on identity, loss, and the reconstruction of self after a defining relationship ends.",
        date: "Apr 15, 2025",
        readTime: "6 min read",
        slug: "when-love-redefines-you",
        tags: ["Life", "Reflection"],
        link: "https://medium.com/write-a-catalyst/when-love-redefines-you-and-how-you-deal-when-its-over-39f5ed066748"
    },
    {
        id: 8,
        title: "Building Glyph: from an idea to a paid product",
        excerpt: "A short note on building solo, launching publicly, and learning from paying customers.",
        date: "Oct 4, 2026",
        readTime: "2 min read",
        slug: "building-glyph",
        tags: ["Startups", "Case Study"]
    }
];

const mediumIds = new Set(mediumPosts.map(post => post.link.match(/[a-f0-9]{12}$/)?.[0]));
export default [...posts.filter(post => !post.link || !mediumIds.has(post.link.match(/[a-f0-9]{12}$/)?.[0])), ...mediumPosts] as BlogPost[];
