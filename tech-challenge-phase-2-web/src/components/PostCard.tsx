import Link from 'next/link';
import type { Post } from '@/types/post';
import { formatDate } from '@/lib/formatDate';

export function PostCard({ post }: { post: Post }) {
  const excerpt =
    post.content.length > 160
      ? `${post.content.slice(0, 160)}...`
      : post.content;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-900">
        <Link href={`/posts/${post._id}`} className="hover:text-indigo-700">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-slate-600">{excerpt}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700">
          {post.author}
        </span>
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>
    </article>
  );
}
