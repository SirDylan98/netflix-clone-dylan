import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaRegPlayCircle } from "react-icons/fa";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px]  inline-block cursor-pointer relative   p-2">
      <img
        className="w-full h-[280px] object-cover block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal break-all text-xs md:text-lg font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <div className="absolute top-0 left-0 w-full h-full">

        <FaRegPlayCircle onClick={() => {
            navigate(`/trailer/${item.id}`);
          }} size={40} className="text-white flex justify-center items-center h-full hover:scale-110 duration-500 transition ease-in-out mx-auto mt-16"/>
        </div>
        {/* <button
          onClick={() => {
            navigate(`/trailer/${item.id}`);
          }}
          className="border bg-gray-300 text-black border-gray-300 py-2 px-5 rounded-xl absolute mx-auto top-[60%] hover:-translate-y-1 duration-500 left-1 md:left-[30%]"
        >
          Play Trailer
        </button> */}
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
