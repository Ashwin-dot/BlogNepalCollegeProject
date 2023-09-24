import React from "react";
import { Link } from "react-router-dom";
import SkeletonElement from "../Skeletons/SkeletonElement";
import NoStories from "./NoStories";

const Story = ({ story }) => {
  const editDate = (createdAt) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(createdAt);
    var datestring =
      d.getDate() + " " + monthNames[d.getMonth()] + " ," + d.getFullYear();
    return datestring;
  };

  const truncateContent = (content) => {
    const trimmedString = content.substr(0, 173);
    return trimmedString;
  };
  const truncateTitle = (title) => {
    const trimmedString = title.substr(0, 69);
    return trimmedString;
  };

  return (
    <div className="story-card">
      <Link to={`/story/${story.slug}`} className="story-link">
        <img
          className=" story-image"
          src={`/storyImages/${story.image}`}
          alt={story.title}
        />

        <div className="story-content-wrapper">
          <div className="story-cate-date">
            <p className="story-category">{story.category}</p>
            <p className="story-createdAt">{editDate(story.createdAt)}</p>
            <p className="story-author">{story.author.username}</p>
          </div>

          <h5 className="story-title">
            {story.title.length > 76
              ? truncateTitle(story.title) + "..."
              : story.title}
          </h5>

          <p
            className="story-text"
            dangerouslySetInnerHTML={{
              __html: truncateContent(story.content) + "...",
            }}
          ></p>
        </div>
      </Link>
    </div>
  );
};

export default Story;
