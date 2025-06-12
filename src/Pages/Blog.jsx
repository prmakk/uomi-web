import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageContainer from '../components/PageContainer';
import { getPostsData } from '../lib/blog';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsData().then(setPosts);
  }, []);

  const postsList = useMemo(() => {
    return posts.map((post) => {
      post.dateObj = new Date(post.date);
      post.dateString = post.dateObj.toLocaleDateString();
      return post;
    }).sort((a, b) => b.dateObj - a.dateObj);
  }, [posts]);

  return (
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
                  to={`/blog/${post.id}`}
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
  );
}