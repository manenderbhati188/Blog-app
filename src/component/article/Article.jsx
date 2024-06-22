import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const apiKey = '55913e9f1daa42be964a65f3239a987e';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${decodeURIComponent(articleId)}&apiKey=${apiKey}`);
        const data = await response.json();
        setArticle(data.articles[0]);
      } catch (error) {
        console.error('Error fetching article: ', error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-detail">
      <h2>{article.title}</h2>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read full article</a>
    </div>
  );
};

export default ArticleDetail;
