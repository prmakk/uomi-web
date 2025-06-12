import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostData } from '../lib/blog';
import PageContainer from '../components/PageContainer';

const postComponents = import.meta.glob('../posts/*.mdx');

export default function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [MDXComponent, setMDXComponent] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const loadPost = async () => {
      const postData = await getPostData(postId);
      setPost(postData);

      const path = `../posts/${postId}.mdx`;
      if (postComponents[path]) {
        const mod = await postComponents[path]();
        setMDXComponent(() => mod.default);
      } else {
        console.error(`Post component not found for path: ${path}`);
      }
    };

    loadPost();
  }, [postId]);

  const dateString = post ? new Date(post.date).toLocaleDateString() : '';

  if (!post || !MDXComponent) {
    return (
      <div className="dark bg-black text-white min-h-screen">
        <PageContainer>
          <div className="text-center py-12">Loading...</div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="dark bg-black text-white min-h-screen">
      <PageContainer>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto mb-12"
            width={36}
            height={20}
          />
        ) : (
          <div className="py-24"></div>
        )}
        
        <h1 className="text-center text-3xl font-semibold mb-6 max-w-5xl mx-auto">
          {post.title}
        </h1>
        
        <p className="text-center text-sm font-mono text-gray-500 mb-16 uppercase tracking-wider">
          {dateString}
        </p>
        
        <article className="PageContent w-full max-w-3xl mx-auto prose prose-invert prose-lg">
          <style>{`
            .PageContent {
              color: #d1d5db;
            }
            .PageContent h1, .PageContent h2, .PageContent h3, .PageContent h4, .PageContent h5, .PageContent h6 {
              color: #dffe00;
              font-weight: 600;
              margin-top: 2em;
              margin-bottom: 1em;
            }
            .PageContent h1 {
              font-size: 2.25em;
            }
            .PageContent h2 {
              font-size: 1.875em;
            }
            .PageContent h3 {
              font-size: 1.5em;
            }
            .PageContent p {
              margin-bottom: 1.25em;
              line-height: 1.75;
            }
            .PageContent a {
              color: #dffe00;
              text-decoration: none;
            }
            .PageContent a:hover {
              text-decoration: underline;
            }
            .PageContent code {
              background-color: #27272a;
              color: #fef08a;
              padding: 0.125em 0.25em;
              border-radius: 0.25rem;
              font-size: 0.875em;
            }
            .PageContent pre {
              background-color: #18181b;
              border: 1px solid #27272a;
              border-radius: 0.5rem;
              padding: 1rem;
              margin: 1.5em 0;
              overflow-x: auto;
            }
            .PageContent pre code {
              background-color: transparent;
              padding: 0;
            }
            .PageContent blockquote {
              border-left: 4px solid #dffe00;
              padding-left: 1em;
              margin-left: 0;
              color: #a1a1aa;
              font-style: italic;
            }
            .PageContent ul, .PageContent ol {
              margin-bottom: 1.25em;
              padding-left: 1.5em;
            }
            .PageContent li {
              margin-bottom: 0.5em;
            }
          `}</style>
          <MDXComponent />
        </article>
      </PageContainer>
    </div>
  );
}