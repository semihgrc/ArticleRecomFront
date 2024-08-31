import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/article.css";

axios.defaults.baseURL = 'http://127.0.0.1:5000';

export default function ArticlePage() {
  const { userId, articleId } = useParams();
  const [articleName, setArticleName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const updateUserVector = async () => {
      try {
        const response = await axios.post(`/articletext/${userId}/${articleId}`);
        setArticleName(response.data.article_name);
        setContent(response.data.content);
        console.log(response.data.message);
      } catch (error) {
        console.error('Error updating user vector:', error);
      }
    };

    if (userId && articleId) {
      updateUserVector();
    }
  }, [userId, articleId]);

  return (
    <div className="article-container">
    <h1 className="article-title">{articleName}</h1>
    <p className="article-content">{content}</p>
  </div>
  );
}
