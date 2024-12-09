// Using native fetch instead of rss-parser package
export const parseRSSFeed = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    return Array.from(items).map(item => ({
      title: item.querySelector('title')?.textContent || '',
      description: item.querySelector('description')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      publishedAt: item.querySelector('pubDate')?.textContent || '',
      mediaContent: {
        $: {
          url: item.querySelector('media\\:content, content')?.getAttribute('url') || ''
        }
      }
    }));
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
};