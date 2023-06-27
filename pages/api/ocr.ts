import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import tesseract from "node-tesseract-ocr";

const app = nc();
app.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const text = await tesseract.recognize(
      "https://pbs.twimg.com/media/FzJBib7WwAIPrGK?format=jpg&name=900x900"
    );
    res.send(text);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default app;
