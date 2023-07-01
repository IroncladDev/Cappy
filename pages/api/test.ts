import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { TwitterClient } from "server/lib/twitter";

const app = nc();

app.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { v1, v2 } = await TwitterClient();

    const cappy = await v1.userTimelineByUsername("IroncladDev");

    console.log(cappy);
    
    res.json(cappy)
  } catch (e) {
    console.log(e)
    res.json({
      message: "There do be an error",
      error: e
    })
  }
});

export default app;
