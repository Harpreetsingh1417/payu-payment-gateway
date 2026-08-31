"use client";

import { useEffect, useState } from "react";

export default function TestApiPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Posts</h1>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Posts</h1>
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Posts</h1>

      <div className="post-list">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <h2>
              {post.id}. {post.title}
            </h2>

            <p>{post.body}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px;
        }

        h1 {
          margin-bottom: 25px;
        }

        .post-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .post-card {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #f9f9f9;
        }

        .post-card h2 {
          margin: 0 0 10px;
          font-size: 18px;
          text-transform: capitalize;
        }

        .post-card p {
          margin: 0;
          line-height: 1.6;
        }

        .error {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

