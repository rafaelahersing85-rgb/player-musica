import express from "express";
import ytdlp from "yt-dlp-exec";

const app = express();

app.get("/audio", async (req, res) => {

  const url = req.query.url;

  if(!url){
    return res.status(400).send("URL missing");
  }

  try{

    const file="audio.mp3";

    await ytdlp(url,{
      extractAudio:true,
      audioFormat:"mp3",
      output:file
    });

    res.sendFile(file,{root:"."});

  }catch(e){

    res.status(500).send("download error");

  }

});

app.listen(3000);
