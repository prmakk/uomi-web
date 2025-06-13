'use client'

import { useEffect, useState } from 'react';

export default function MDXContent({ postId }) {
  const [MDXComponent, setMDXComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const loadMDX = async () => {
      try {
        const module = await import(`../posts/${postId}.mdx`);
        setMDXComponent(() => module.default);
      } catch (error) {
        console.error(`Error loading MDX for ${postId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadMDX();
  }, [postId]);

  if (loading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  if (!MDXComponent) {
    return <div className="text-center py-8">Content not available</div>;
  }

  return <MDXComponent />;
}
