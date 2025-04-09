import getGeminiResponse from "./gemini/index.js";
import app from "./server/index.js";

app.post("/img", async (req, res) => {
  const { url: imgURL } = req.body;

  const imgRes = await fetch(`${imgURL}`).then((img) => img.arrayBuffer());

  try {
    const response = await getGeminiResponse(imgRes);
    // console.log(response.candidates[0]?.content);

    res.json(
      response.candidates[0]?.content?.parts[0]?.text ?? "No data for u b***"
    );
  } catch (error) {
    console.error("error: " + error);
  }
});

app.listen(8000, () => {
  console.log("server is running at: http://localhost:" + process.env.PORT);
});
