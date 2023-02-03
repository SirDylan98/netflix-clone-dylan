import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

export default function Trailer() {
  const key = "3ad291eb9507b4cba48633bcc892371b";
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState({});
  console.log("This is the current page ",window.location.pathname)
  useEffect(() => {
    const fetchTrailer = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US&page=1`
        )
        .then((response) => {
          // <YouTube videoId={response.data.results.key}/>
          console.log(
            "my vids" +
              response.data.results.find(
                (vid) => vid.name === "Official Trailer"
              )
          );
          setSelectedMovie(
            response.data.results.find((vid) => vid.name === "Official Trailer")
          );
        });
    };
    fetchTrailer();
  }, []);
  const onPlayerReady= (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  const opts = {
    height: '600px',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      origin:"http://localhost:3001",

    },
  };

  return (
    <div className="w-full">
      <YouTube className="absolute top-16 w-screen" videoId={selectedMovie.key} opts={opts} onReady={onPlayerReady}/>
    </div>
  );
}
