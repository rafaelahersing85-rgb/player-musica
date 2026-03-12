import express from "express";
import { exec } from "child_process";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/audio", (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.status(400).send("missing url");
  }

  const file = "audio.mp3";

  const cmd = `yt-dlp -x --audio-format mp3 -o "${file}" "${url}"`;

  exec(cmd, (err) => {

    if (err) {
      return res.status(500).send("download error");
    }

    res.download(file, () => {
      fs.unlinkSync(file);
    });

  });

});

app.listen(PORT);
