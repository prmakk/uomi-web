import fs from 'fs';
import path from 'path';

// Percorso assoluto alla cartella dei post
const postsDir = path.join(process.cwd(), 'src/posts');

// Funzione per estrarre metadati da un file MDX
function extractMetadata(content) {
  const metadataRegex = /export const metadata = \{([\s\S]*?)\};/;
  const match = content.match(metadataRegex);
  
  if (!match) {
    return {};
  }

  try {
    // Estrae il contenuto dell'oggetto metadata
    const metadataString = match[1];
    
    // Estrae i singoli campi usando regex più specifiche
    const titleMatch = metadataString.match(/title:\s*["'`](.*?)["'`]/);
    const descriptionMatch = metadataString.match(/description:\s*["'`]([\s\S]*?)["'`]/);
    const dateMatch = metadataString.match(/date:\s*\(new Date\('([^']+)'\)\)\.getTime\(\)/);
    const imageMatch = metadataString.match(/image:\s*["'`](.*?)["'`]/);

    const metadata = {};
    
    if (titleMatch) metadata.title = titleMatch[1];
    if (descriptionMatch) metadata.description = descriptionMatch[1];
    if (dateMatch) metadata.date = new Date(dateMatch[1]).getTime();
    if (imageMatch) metadata.image = imageMatch[1];

    return metadata;
  } catch (error) {
    console.error('Error parsing metadata:', error);
    return {};
  }
}

// Recupera tutti i post con metadati
export async function getPostsData() {
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

  const posts = filenames.map((filename) => {
    const id = filename.replace(/\.mdx$/, '');
    const filePath = path.join(postsDir, filename);
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const metadata = extractMetadata(content);
      
      return {
        ...metadata,
        id,
        title: metadata.title || id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        date: metadata.date || new Date().getTime(),
        description: metadata.description || 'Post description not available',
      };
    } catch (error) {
      console.error(`Errore nel parsing del post ${id}:`, error);
      return {
        id,
        title: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        date: new Date().getTime(),
        description: 'Post description not available',
      };
    }
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Recupera un singolo post
export async function getPostData(id) {
  const filePath = path.join(postsDir, `${id}.mdx`);
  
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const metadata = extractMetadata(content);
    
    // Restituisce solo i metadati senza il componente MDX
    // Il componente sarà caricato dinamicamente nel client component
    return {
      ...metadata,
      id,
      title: metadata.title || id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      date: metadata.date || new Date().getTime(),
      description: metadata.description || 'Post description not available',
    };
  } catch (error) {
    console.error(`Errore caricamento post ${id}:`, error);
    return null;
  }
}
