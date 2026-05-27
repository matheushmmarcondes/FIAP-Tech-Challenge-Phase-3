import Link from 'next/link';
import type { Post } from '@/types/post';
import { formatDate } from '@/lib/formatDate';

export function PostCard({ post }: { post: Post }) {
  const excerpt =
    post.content.length > 160
      ? `${post.content.slice(0, 160)}...`
      : post.content;

  return (
    <article className="rounded-[2px] border border-zinc-800 bg-zinc-900/50 p-5 shadow-lg transition hover:border-zinc-600 hover:shadow-[0_0_24px_rgba(197,0,20,0.12)]">
      <h2 className="text-xl font-semibold text-zinc-100">
        <Link
          href={`/posts/${post._id}`}
          className="transition hover:text-[#ff6b7a]"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-zinc-400">{excerpt}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <span className="rounded-[2px] border border-zinc-700 bg-zinc-800/80 px-2 py-1 text-zinc-300">
          {post.author}
        </span>
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>
    </article>
  );
}
