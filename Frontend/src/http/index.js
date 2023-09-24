import axios from "axios";
export async function checkPlagiarish(text) {
  const options = {
    method: "POST",
    url: "https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "275cf1519cmsh7d976e9375e9611p1e8b37jsn1b40f657b852",
      "X-RapidAPI-Host":
        "plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com",
    },
    data: {
      text: text,
      language: "en",
      includeCitations: false,
      scrapeSources: false,
    },
  };

  try {
    return await axios.request(options);
  } catch (error) {
    console.error(error);
  }
}
