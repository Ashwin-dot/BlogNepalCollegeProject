import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";
import Pagination from "./Pagination";
import "../../Css/Home.css";
import "../../Css/SideBar.css";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const search = useLocation().search;
  const searchKey = new URLSearchParams(search).get("search");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [category, setCategory] = useState("All");

  const options = [
    { value: "All", label: "All" },
    { value: "Technology", label: "Technology" },
    { value: "Coding", label: "Coding" },
    { value: "Ai", label: "Ai" },
    { value: "Finance", label: "Finance" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Fashion", label: "Fashion" },
    { value: "Food", label: "Food" },
    { value: "Music", label: "Music" },
    { value: "Others", label: "Others" },
  ];

  useEffect(() => {
    const getStories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/story/getAllStories?search=${searchKey || ""}&page=${page}`
        );

        if (searchKey) {
          navigate({
            pathname: "/",
            search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`,
          });
        } else {
          navigate({
            pathname: "/",
            search: `${page > 1 ? `page=${page}` : ""}`,
          });
        }
        setStories(data.data);
        setPages(data.pages);

        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    getStories();
  }, [setLoading, search, page, navigate]);

  useEffect(() => {
    setPage(1);
  }, [searchKey]);

  function btnHandle(opt) {
    console.log("clicked");
    setCategory(opt);
  }
  const getTrendingStories = () => {
    // Sort the stories array in descending order based on the likeCount
    const sortedStories = stories
      .slice()
      .sort((a, b) => b.likeCount - a.likeCount);
    // Return the top three stories with the highest like counts
    return sortedStories.slice(0, 3);
  };

  // Get the three trending stories
  const trendingStories = getTrendingStories();

  return (
    <>
      <div className="boody">
        <div className="sidebar">
          <h2>Categories</h2>
          <select
            className="dropdown"
            value={category}
            onChange={(e) => btnHandle(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="sidebar">
          <h2>Categories</h2>
          <ul>
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  className={
                    category === opt.value ? "sideBarBtnActive" : "sideBarBtn"
                  }
                  onClick={() => btnHandle(opt.value)}
                >
                  {opt.value}
                </button>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="Inclusive-home-page">
          {loading ? (
            <div className="skeleton_emp">
              {[...Array(6)].map(() => {
                return (
                  // theme dark :> default : light
                  <SkeletonStory key={uuidv4()} />
                );
              })}
            </div>
          ) : (
            <div>
              <div className="Trending Topics">
                <div className="trendingText">
                  <h4>Trending Topic</h4>
                </div>
                <div className="story-card-trending-wrapper">
                  {trendingStories.map((story) => (
                    <CardStory key={uuidv4()} story={story} />
                  ))}
                </div>
              </div>
              <div className="VategoryText">
                <h4>{category}</h4>
              </div>
              <div className="story-card-wrapper">
                {stories.length !== 0 ? (
                  category === "All" ? (
                    stories.map((story) => (
                      <CardStory key={uuidv4()} story={story} />
                    ))
                  ) : (
                    stories.map((story) => {
                      if (story.category === category) {
                        return <CardStory key={uuidv4()} story={story} />;
                      } else {
                        return null;
                      }
                    })
                  )
                ) : (
                  <NoStories />
                )}
                {stories.length !== 0 &&
                  category !== "All" &&
                  !stories.some((story) => story.category === category) && (
                    <div className="no-data-message">
                      <h2> There is no data available for this category.</h2>
                    </div>
                  )}
              </div>

              <Pagination page={page} pages={pages} changePage={setPage} />
            </div>
          )}
          <br />
        </div>
      </div>
    </>
  );
};

export default Home;
