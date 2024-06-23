import React, { useEffect, useState } from "react";
import Preloader from "../Pages/Preloader";

const CLIENT_ID = "5904571c462c415a9357865a6639c5b3";
const CLIENT_SECRET = "57c7ce0dc2014f47a82aeb737ce18987";
const REFRESH_TOKEN =
  "AQBJz5lUAILSryzpB5iq_wQCCNTf4hcLLYHSGI8QouGaP1YCzOqEI8PxEWnNlmGiLwNu6FV9PTnt9y7eStKdi58TKhlvVEw6z98RDOoFInndzmCWqOt1gkAc0xEXk2tJQpQ";
let accessToken =
  "BQDLqIrCtPEDGXhR0A9LjPvpQ49QBqLYAk-tcMwZhNZ7IV0yLH9qcG7sXqI9iEr3LUVzM5yk42F5NjgZ8XQ7503jyuKAa4Curz5Z106Ys42Bcy1Ds8RCI5YPnOka4hFGtz3rRnUigpVO3pfME8yul7X5FrVMAb3EfWIhGc6xg_yYTI44rMP7zuyxPwucHDXruusLc-SPs4k";

function refreshAccessToken() {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=refresh_token&refresh_token=" + REFRESH_TOKEN,
  })
    .then((response) => response.json())
    .then((data) => {
      const newAccessToken = data.access_token;
      console.log("New access token:", newAccessToken);
      accessToken = newAccessToken;
    })
    .catch((error) => console.error(error));
}

const ListeningNow = () => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function getCurrentTrack() {
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            return refreshAccessToken().then(() => {
              return fetch(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                  headers: {
                    Authorization: "Bearer " + accessToken,
                  },
                }
              );
            });
          } else {
            return response;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setTrack(data.item);
        })
        .catch((error) => console.error(error));
    }

    getCurrentTrack();
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-500 p-4">
          <div className="flex flex-row items-center justify-center">
            <iframe
              id="embed"
              className="mt-24 rounded-lg"
              src={`https://open.spotify.com/embed/track/${track.id}`}
              width="800"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ minHeight: "500px", marginLeft: "20px" }}
            ></iframe>
            <iframe
              title="Spotify Embed: Recommendation Playlist"
              src={`https://open.spotify.com/embed/playlist/0HGGuCOCtGIlQE8BaY4dez?utm_source=generator&theme=0`}
              width="800"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ minHeight: "500px", marginLeft: "20px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListeningNow;
