import React, { useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlineUpload } from "react-icons/ai";
import "../../Css/AddStory.css";
import { checkPlagiarish } from "../../http";
import Loader from "../GeneralScreens/Loader";

const AddStory = () => {
  const { config } = useContext(AuthContext);
  const imageEl = useRef(null);
  const editorEl = useRef(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [plgData, setPlgData] = useState("100");
  const [loading, setLoading] = useState("");
  const [show, setShow] = useState("");

  const clearInputs = () => {
    setTitle("");
    setContent("");
    setImage("");
    setCategory("");
    setPlgData("");
    setShow("");
    editorEl.current.editor.setData("");
    imageEl.current.value = "";
  };
  const options = [
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

  async function clickbtn() {
    setLoading(true);
    try {
      const { data } = await checkPlagiarish(content);
      console.log(data.percentPlagiarism);
      setPlgData(data.percentPlagiarism);
      setLoading(false);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("image", image);
    formdata.append("content", content);
    formdata.append("category", category);

    try {
      const { data } = await axios.post("/story/addstory", formdata, config);
      setSuccess("Add story successfully ");

      clearInputs();
      setTimeout(() => {
        setSuccess("");
      }, 7000);
    } catch (error) {
      setTimeout(() => {
        setError("");
      }, 7000);
      setError(error.response.data.error);
    }
  };
  const handleOptionChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="Inclusive-addStory-page ">
      <form onSubmit={handleSubmit} className="addStory-form">
        {error && <div className="error_msg">{error}</div>}
        {success && (
          <div className="success_msg">
            <span>{success}</span>
            <Link to="/">Go home</Link>
          </div>
        )}

        <input
          type="text"
          required
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <CKEditor
          editor={ClassicEditor}
          onChange={(e, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
          ref={editorEl}
        />
        <div className="StoryImageField">
          <AiOutlineUpload />
          <div className="txt">
            {image ? image.name : " Include a high-quality image "}
          </div>
          <input
            name="image"
            type="file"
            ref={imageEl}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="opt">
          <label className="opt-label" htmlFor="optionSelect">
            Select an category
          </label>
          <select
            id="category"
            className="opt-category"
            value={category}
            onChange={handleOptionChange}
          >
            <option value="Others">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => clickbtn()}
          disabled={content.length >= 50 ? false : true}
          className={content.length >= 50 ? "addPlagiarisim-btn" : "displg-btn"}
        >
          Check Plagiarism
        </button>
        {loading && <Loader />}
        {show && <h4> Plagiarism Percentage : {plgData}</h4>}
        <br />
        <p>
          Note: If Plagiarism Percentage is greater than 50 then it can't be
          submitted.
        </p>

        <button
          type="submit"
          disabled={image && category && plgData <= 50 ? false : true}
          className={
            image && category && plgData <= 50 ? "addStory-btn" : "dis-btn"
          }
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddStory;
