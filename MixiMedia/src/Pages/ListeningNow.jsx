import React, { useEffect, useState } from "react";
import Preloader from "../Pages/Preloader";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
let accessToken = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;
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
