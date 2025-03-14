import { useEffect, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./Newpost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Post from "./Post";
import PostLayout from "./PostLayout";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My first Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Made a video about Tesla Q1 results",
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01 2021 11:17:36 AM",
      body: "I attended a DeFi blockchain event",
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Web3 global summit next week",
    },
    {
      id: 4,
      title: "My forth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "ETH will out perform BTC",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchReasult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchReasult(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
  };
  const handleDelete = (id) => {
    const postList = posts.filter((post) => post.id !== id);
    setPosts(postList);
    navigate("/");
  };

  return (
    <>
      <div className="mDiv">
        <Header title="Social Media" />
        <Nav search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home posts={searchResults} />} />
          <Route path="post">
            <Route
              index
              element={
                <NewPost
                  handleSubmit={handleSubmit}
                  postTitle={postTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                  setPostTitle={setPostTitle}
                />
              }
            />
            <Route
              path=":id"
              element={<PostPage posts={posts} handleDelete={handleDelete} />}
            />
          </Route>
          {/* <Route path="/post" element={<PostPage />} /> */}
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
