import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../css/dashboard.css";

axios.defaults.baseURL = 'http://127.0.0.1:5000';

export default function DashboardPage() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(20);

  const handleGetUserInfo = () => {
    axios.get(`/user/${userId}`)
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    axios.get('/articles')
      .then(response => {
        const articlesData = JSON.parse(response.data);
        setArticles(articlesData.map(article => ({ ...article, _id: article._id['$oid'] })));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const filteredArticles = articles.filter(article =>
    article.article_id.toString().includes(searchTerm) || 
    (article.article_name && article.article_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="dashboard-container">
      <h2>Top Articles</h2>
      <button className="get-user-info-button" onClick={handleGetUserInfo}>Get User Info</button>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Article ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {userInfo && (
        <>
          <h3>FastText Top Articles</h3>
          <ul className="article-list">
            {userInfo.ft_top_articles && userInfo.ft_top_articles.map(article => (
              <li key={article[0]} className="top-article-item">
                <span>Article Name: {articles.find(a => a.article_id === article[0])?.article_name || article[0]}, Score: {article[1]}</span>
              </li>
            ))}
          </ul>
          <h3>SciBERT Top Articles</h3>
          <ul className="article-list">
            {userInfo.sb_top_articles && userInfo.sb_top_articles.map(article => (
              <li key={article[0]} className="top-article-item">
                <span> {articles.find(a => a.article_id === article[0])?.article_name || article[0]}, Score: {article[1]}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <ul className="article-list">
        {currentArticles.map(article => (
          <li key={article._id} className="current-article-item">
            <Link to={`/article/${userId}/${article._id}`} className="article-link"> {article.article_name || article.article_id}</Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
