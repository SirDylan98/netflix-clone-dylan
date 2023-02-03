import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import RenderVidz from "./RenderVidz";




export default function Main() {
  const key = "3ad291eb9507b4cba48633bcc892371b";
  const [movies, setMovies] = useState([]);
  const [selectedTrailer, setselectedTrailer] = useState({})
  const  [isPlay, setisPlay] = useState(false)
  //const movie = movies[Math.floor(Math.random() * movies.length)];
  const movie = movies[5];
  useEffect(() => {
    const fetchData=async()=>{

      await axios.get(requests.requestPopular).then((response) => {
        setMovies(response.data.results);
        
      });
      await handlePlay()
      console.log("Waiting Done!!!!!!!!")
    }
    fetchData()
  }, [isPlay]);

  console.log(movie);
  const handlePlay = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${key}&language=en-US&page=1`
      )
      .then((response) => {
       // <YouTube videoId={response.data.results.key}/>
        console.log("my vids"+response.data.results.find(vid=>vid.name==="Official Trailer"));
        setselectedTrailer(response.data.results.find(vid=>vid.name==="Official Trailer"))
      });
  };
 // console.log(response.data.results);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
      
    }
  };
  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
     
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button onClick={()=>setisPlay(!isPlay)} className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              {isPlay?"Stop Playing":"Play Trailer"}
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
          <div className=" absolute top-5 right-5 w-[40%] h-[50%]">

          {isPlay==true&&typeof(selectedTrailer)!==undefined?<RenderVidz trailer={selectedTrailer}/>:console.log("NO MOVIE SELECTED YET")}
          </div>
        </div>
      </div>
    </div>
  );
}
