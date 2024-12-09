// Using relative imports
import { fetchLatestArticles, parseArticle } from './utils/api.js';

class NewTabManager {
  constructor() {
    this.articlesGrid = document.getElementById('articles-grid');
    this.initialize();
  }

  async initialize() {
    await this.loadArticles();
  }

  async loadArticles() {
    try {
      const articles = await fetchLatestArticles();
      this.renderArticles(articles);
    } catch (error) {
      this.renderError('Failed to load articles. Please try again later.');
    }
  }

  renderArticles(articles) {
    if (!articles.length) {
      this.renderError('No articles found.');
      return;
    }

    this.articlesGrid.innerHTML = articles
      .map(article => {
        const { title, description, imageUrl, url, category, publishedAt } = parseArticle(article);
        return `
          <article class="article-card">
            <img src="${imageUrl}" alt="${title}" class="article-image" onerror="this.src='icons/icon128.png'">
            <div class="article-content">
              <span class="article-category">${category}</span>
              <h2>
                <a href="${url}" class="article-title" target="_blank">${title}</a>
              </h2>
              <p class="article-description">${description}</p>
              <time class="article-date">${publishedAt}</time>
            </div>
          </article>
        `;
      })
      .join('');
  }

  renderError(message) {
    this.articlesGrid.innerHTML = `
      <div class="error">
        <p>${message}</p>
      </div>
    `;
  }
}

// Initialize the new tab page
document.addEventListener('DOMContentLoaded', () => {
  new NewTabManager();
});