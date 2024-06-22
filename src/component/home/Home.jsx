import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const apiKey = '55913e9f1daa42be964a65f3239a987e';
const apiUrl = `https://newsapi.org/v2/top-headlines`;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${apiUrl}?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${apiKey}`);
        const data = await response.json();
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error('Error fetching articles: ', error);
      }
    };

    fetchArticles();
  }, [category, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="home">
      <h1>News App</h1>

      <div className="category-filter">
        <label htmlFor="category-select">Choose a category:</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
        </select>
      </div>

      <div className="articles">
        {articles.map((article) => (
          <div key={article.url} className="article">
            <h2>{article.title}</h2>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            <p>{article.description}</p>
            <Link to={{
              pathname: `/article/${encodeURIComponent(article.url)}`,
              state: { article } 
            }}>Read more</Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>{page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * 10 >= totalResults}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
