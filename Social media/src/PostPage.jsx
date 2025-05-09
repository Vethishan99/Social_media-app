import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button className="btn" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Page Not Found</h2>
            <p>Well that's dissapointing</p>
            <p>
              <Link to="/">Visit Our Home Page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
