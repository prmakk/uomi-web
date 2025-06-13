import { getPostsData } from '../../src/lib/blog.server';
import AppWrapper from '../../src/components/AppWrapper';
import PageContainer from '../../src/components/PageContainer';
import Link from 'next/link';

export default async function Page() {
  const posts = await getPostsData();

  const postsList = posts
    .map((post) => {
      const dateObj = new Date(post.date);
      const dateString = dateObj.toLocaleDateString();
      return { ...post, dateString };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <AppWrapper>
      <div className="dark bg-black text-white min-h-screen">
        <PageContainer>
          <div className="pt-12 pb-24">
            <h1 className="text-center text-3xl font-medium mb-24 uppercase tracking-wider">
              LATEST
            </h1>

            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-w-4xl mx-auto">
              {postsList.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="block hover:text-[#dffe00] transition-colors duration-300"
                  >
                    <h2 className="text-center font-bold mb-2 uppercase">
                      {post.title}
                    </h2>
                    <p className="text-center text-gray-400">
                      {post.description}
                    </p>
                    <p className="text-center text-sm mt-4 font-mono text-gray-500 uppercase tracking-wider">
                      {post.dateString}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            {postsList.length === 0 && (
              <div className="text-center text-gray-400 mt-12">
                No posts yet. Check back soon!
              </div>
            )}
          </div>
        </PageContainer>
      </div>
    </AppWrapper>
  );
}
