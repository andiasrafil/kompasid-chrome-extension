import React from 'react';
import { ArticleCard } from './ArticleCard';

const articles = [
  {
    title: "Are food recalls on the rise? Despite public concern, not really.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    category: "Food Safety",
    size: "large" as const,
    accent: "#f4e8e1"
  },
  {
    title: "Spotify Wrapped's new feature: A personalized AI podcast",
    imageUrl: "https://images.unsplash.com/photo-1611339555312-e607c06951d7",
    category: "Technology",
    accent: "#ffd700"
  },
  {
    title: "FEMA makes it easier for Native tribes to get aid after natural disasters",
    imageUrl: "https://images.unsplash.com/photo-1590496793929-36417d3117b4",
    category: "Policy",
    accent: "#e8f4f8"
  },
  {
    title: "Climate change: Why experts remain hopeful",
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51",
    category: "Climate",
    size: "medium" as const,
    accent: "#001f3f"
  }
];

export const NewsGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}>
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </div>
  );
};