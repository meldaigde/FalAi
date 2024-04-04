
const express = require("express");
const fal = require("@fal-ai/serverless-client");
const app = express();
const PORT = 8888;
app.use(express.json());
app.use(express.static("./"));

fal.config({
    credentials:
      "21566fb8-1fa3-43b9-94a2-4dd0ff4cd0be:68b47b027191722398b352e27d1ebc03", // or a function that returns a string
  });

  app.post("/api", async (req, res) => {
    const result = await fal.subscribe("fal-ai/illusion-diffusion", {
      input: {
        image_url: req.body.url,
          prompt: "(masterpiece:1.4), (best quality), (detailed), Medieval village scene with busy streets and castle in the distance"
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    res.json(result);
    console.log(result);
  });
  
  app.listen(PORT, () => {
    console.log("Server is run!");
  });

  