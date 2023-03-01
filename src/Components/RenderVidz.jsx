import React from 'react'
import YouTube , { YouTubeProps } from 'react-youtube';

export default function RenderVidz({trailer}) {
    const onPlayerReady= (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
      const opts = {
        height: '300px',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          origin:"http://localhost:3001",

        },
      };
  return (
   
    <div className='w-full h-[500px]'>
            <YouTube videoId={trailer?.key} opts={opts} onReady={onPlayerReady}/>
        </div>
  )
}
