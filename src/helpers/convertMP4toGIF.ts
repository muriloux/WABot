import ffmpeg from "ffmpeg";

export const convertMP4toGIF = (path: string, callback: Function) => {
  try {
    const process = new ffmpeg(path);
    process.then((video) => {
      video
        .setVideoSize("128x128", true, true)
        .setVideoFormat("gif")
        .save("temp/temp.gif", function (error, file) {
          if (!error) console.log("Video file: " + file);
          callback();
        });
    });
  } catch (err) {
    console.log("error converting to gif: " + err);
  }
};
