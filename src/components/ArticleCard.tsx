import React from 'react';

interface ArticleProps {
  title: string;
  imageUrl: string;
  category: string;
  size?: 'small' | 'medium' | 'large';
  accent?: string;
}

export const ArticleCard: React.FC<ArticleProps> = ({ 
  title, 
  imageUrl, 
  category,
  size = 'medium',
  accent
}) => {
  const sizeClasses = {
    small: 'h-48',
    medium: 'h-64',
    large: 'h-96'
  };

  return (
    <div 
      className={`relative group overflow-hidden ${sizeClasses[size]} transition-transform duration-300 hover:scale-[1.02]`}
      style={{ backgroundColor: accent }}
    >
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div className="absolute bottom-0 p-6 text-white">
          {category && (
            <span className="inline-block px-2 py-1 mb-3 text-xs font-semibold uppercase tracking-wider border border-white/30 rounded">
              {category}
            </span>
          )}
          <h2 className="text-2xl font-bold leading-tight">{title}</h2>
        </div>
      </div>
    </div>
  );
};