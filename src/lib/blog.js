const postsImport = import.meta.glob('../posts/*.mdx');

export async function getPostsData() {
  const posts = await Promise.all(
    Object.entries(postsImport).map(async ([path, resolver]) => {
      const file = await resolver();
      const id = path.split('/').pop().replace('.mdx', '');
      return {
        ...(file.metadata || {}),
        id,
      };
    })
  );
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostData(id) {
  const file = await postsImport[`../posts/${id}.mdx`]();
  return file.metadata || {};
}