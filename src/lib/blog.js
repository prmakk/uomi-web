
// Lista automatica dei post dalla cartella src/posts
const postIds = [
  'breaking-the-chains-of-determinism',
  'crypto-hyperstition-meets-ai',
  'introducing-uomi-ecosystem',
  'on-fair-launches',
  'opoc',
  'the-finney-testnet-is-live',
  'uomi-testnet-ai-agents-are-live'
];

export async function getPostsData() {
  const posts = await Promise.all(
    postIds.map(async (id) => {
      try {
        // Importa dinamicamente il file MDX per ottenere i metadati
        const module = await import(`../posts/${id}.mdx`);
        return {
          ...(module.metadata || {}),
          id,
        };
      } catch (error) {
        console.error(`Error importing ${id}:`, error);
        return {
          id,
          title: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          date: new Date().getTime(),
          description: 'Post description not available'
        };
      }
    })
  );
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostData(id) {
  try {
    // Importiamo il componente solo lato client
    if (typeof window !== 'undefined') {
      const module = await import(`../posts/${id}.mdx`);
      return {
        ...(module.metadata || {}),
        content: module.default,
        id
      };
    }
    return null;
  } catch (error) {
    console.error(`Error importing post ${id}:`, error);
    return null;
  }
}