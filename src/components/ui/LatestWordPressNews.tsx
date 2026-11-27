"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Newspaper } from "lucide-react";

type NewsPost = {
  id: number;
  date: string;
  href: string;
  title: string;
  image: string | null;
};

const dateFormatter = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeZone: "UTC" });

async function fetchLatestNews(): Promise<NewsPost[]> {
  const response = await fetch("/api/latest-news");
  if (!response.ok) throw new Error("Không thể tải bài viết WordPress");
  return response.json();
}

export default function LatestWordPressNews() {
  const { data: posts, isPending } = useQuery({
    queryKey: ["latest-wordpress-news"],
    queryFn: fetchLatestNews,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  if (isPending) return <p role="status" className="text-sm text-gray-600">Đang tải tin mới…</p>;
  if (!posts?.length) {
    return <p className="text-sm text-gray-600">Hiện chưa tải được tin mới. Bạn có thể chọn “Xem thêm” để đến trang tin tức.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((post) => (
        <article key={post.id} className="min-w-0">
          <a href={post.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
            <div className="relative grid aspect-[16/10] place-items-center bg-[#EEF5FF]">
              <Newspaper className="h-8 w-8 text-blue-300" aria-hidden="true" />
              {post.image && (
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  onError={(event) => { event.currentTarget.hidden = true; }}
                />
              )}
            </div>
            <div className="flex flex-col gap-2 px-4 pb-5 pt-4">
              <time dateTime={post.date} className="text-xs font-medium text-slate-600">{dateFormatter.format(new Date(post.date))}</time>
              <h3 className="break-words text-[15px] font-bold leading-snug text-[#1A1F36] group-hover:text-[#0057FF]">{post.title}</h3>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
