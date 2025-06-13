'use client'

import BlogPost from "../../../src/Pages/BlogPost";
import AppWrapper from "../../../src/components/AppWrapper";

export default async function Page({ params }) {
  const { postId } = await params;
  
  return (
    <AppWrapper>
      <BlogPost postId={postId} />
    </AppWrapper>
  );
}
