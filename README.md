# MixiMedia

MixiMedia is an audio player application built with React, Tailwind CSS, and Pixi.js. The project allows users to play songs, view currently playing tracks, and see what the user is currently listening to on Spotify through the Spotify API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Play, pause, and skip songs.
- View track information including title, artist, and album cover.
- Adjust volume and mute audio.
- See what you're currently listening to on Spotify.
- Responsive design using Tailwind CSS.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Pixi.js**: 2D rendering engine for displaying images.
- **Spotify API**: Integration to show currently playing track on Spotify.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/DrinVitia/miximedia.git
    cd MixiMedia
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and add your Spotify API credentials:
    ```env
    REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
    REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret
    REACT_APP_SPOTIFY_REFRESH_TOKEN=your_refresh_token
    REACT_APP_SPOTIFY_ACCESS_TOKEN=your_access_token
    ```

4. Start the development server:
    ```sh
    npm start or npm run dev
    ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to see the application.
- Use the audio player to play, pause, and skip songs.
- Adjust the volume or mute the audio.
- View the "Listening Now" page to see what you are currently listening to on Spotify.

## Project Structure

```bash
miximedia/
├── public/
│   ├── index.html
│   ├── ...
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ...
│   ├── pages/
│   │   ├── AudioPlayer.jsx
│   │   ├── About.jsx
│   │   ├── ListeningNow.jsx
│   ├── App.jsx
│   ├── index.js
│   ├── ...
├── .env
├── package.json
├── tailwind.config.js
├── README.md
