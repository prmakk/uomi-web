
import { getPostData, getPostsData } from '../../../src/lib/blog.server';
import AppWrapper from '../../../src/components/AppWrapper';
import PageContainer from '../../../src/components/PageContainer';
import MDXContent from '../../../src/components/MDXContent';
import '../../../src/styles/blog.css';

export async function generateStaticParams() {
  const posts = await getPostsData();
  return posts.map((post) => ({ postId: post.id }));
}

export default async function Page({ params }) {
  const { postId } = await params;
  const post = await getPostData(postId);

  if (!post) {
    return (
      <AppWrapper>
        <div className="dark bg-black text-white min-h-screen">
          <PageContainer>
            <div className="text-center py-12">Post not found</div>
          </PageContainer>
        </div>
      </AppWrapper>
    );
  }

  const { title, image, date, description } = post;
  const dateString = date ? new Date(date).toLocaleDateString() : '';

  return (
    <AppWrapper>
      <div className="dark bg-black text-white min-h-screen">
        <PageContainer>
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-auto mb-12"
              width={36}
              height={20}
            />
          )}

          <h1 className="text-center text-3xl font-semibold mb-6 max-w-5xl mx-auto">
            {title}
          </h1>

          <p className="text-center text-sm font-mono text-gray-500 mb-16 uppercase tracking-wider">
            {dateString}
          </p>

          <article className="blog-content w-full max-w-3xl mx-auto prose prose-invert prose-lg">
            <MDXContent postId={postId} />
          </article>
        </PageContainer>
      </div>
    </AppWrapper>
  );
}
