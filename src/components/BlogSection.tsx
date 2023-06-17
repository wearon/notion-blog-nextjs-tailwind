import { Img } from "@/components/Img";
import Link from "next/link";

export const BlogSection = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <div className="px-6 pb-6 mx-auto -mt-12 bg-white max-w-7xl lg:px-8">
      <div className="grid max-w-2xl grid-cols-1 mx-auto mt-16 gap-x-8 gap-y-20 sm:grid-cols-2 sm:mx-0 sm:max-w-none lg:grid-cols-3">
        {posts.map((post) => {
          return (
            <Link href={`/${post.url}`} key={post?.id}>
              <article className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <Img
                    maxHeight="200px"
                    src={post?.cover}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="flex items-center mt-8 text-xs gap-x-4">
                    <time
                      dateTime={post.last_edited_time}
                      className="text-gray-500"
                    >
                      {post.updatedAt}
                    </time>
                  </div>
                  <div className="relative group">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <span className="absolute inset-0" />
                      {post?.title}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                      {post.description}
                      {post.properties?.tags.map((tag, i) => (
                        <span
                          key={tag.id + tag.color + "i"}
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mx-1"
                          }
                          style={{
                            backgroundColor: tag.color,
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
