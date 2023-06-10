import React from "react";
import { Link } from "react-router-dom";
import { YogaBlog } from "../models/yogaList.interface";

interface YogaItemProps {
  item: YogaBlog;
}

export function YogaItem({ item }: YogaItemProps) {
  return (
    <article className="relative isolate flex flex-col gap-8 lg:flex-row">
      <div className="relative w-full">
        <img
          src={`https://img.youtube.com/vi/${item.youtubeId}/0.jpg`}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>

      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <Link
            to={`/yoga/${item.id}`}
            type="button"
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {item.title}
          </Link>
        </div>
        <div className="group relative max-w-xl">
          <p
            data-testid="details"
            className="mt-5 text-sm leading-6 text-gray-600"
          >
            {item.details.substring(0, 200) + "..."}
          </p>
        </div>
      </div>
    </article>
  );
}
