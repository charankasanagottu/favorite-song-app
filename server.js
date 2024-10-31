// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;


const songs = [
  { artist: 'Taylor Swift', title: 'Anti-Hero', album: 'Midnights', year: 2022 },
  { artist: 'Harry Styles', title: 'As It Was', album: 'Harry’s House', year: 2022 },
  { artist: 'Olivia Rodrigo', title: 'Vampire', album: 'Guts', year: 2023 },
  { artist: 'One Direction', title: 'Story of My Life', album: 'Midnight Memories', year: 2013 },
  { artist: 'Dua Lipa', title: 'Levitating', album: 'Future Nostalgia', year: 2020 },
  { artist: 'Billie Eilish', title: 'Happier Than Ever', album: 'Happier Than Ever', year: 2021 },
  { artist: 'The Weeknd', title: 'Blinding Lights', album: 'After Hours', year: 2019 },
  { artist: 'Ed Sheeran', title: 'Bad Habits', album: '=', year: 2021 },
  { artist: 'BTS', title: 'Dynamite', album: 'BE', year: 2020 },
  { artist: 'Ariana Grande', title: 'Positions', album: 'Positions', year: 2020 },
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dailysong', (req, res) => {
  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Daily Song</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            table { width: 50%; margin: 20px auto; border-collapse: collapse; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            a { text-decoration: none; color: #0073e6; font-weight: bold; }
            a:hover { color: #005bb5; }
        </style>
    </head>
    <body>
        <h1>Daily Favorite Song</h1>
        <table>
            <tr><th>Artist</th><th>Title</th><th>Album/EP</th><th>Year</th></tr>
            <tr><td>${randomSong.artist}</td><td>${randomSong.title}</td><td>${randomSong.album}</td><td>${randomSong.year}</td></tr>
        </table>
        <p><a href="/">Home</a> | <a href="/dailysongdata">View JSON Data</a></p>
    </body>
    </html>
  `);
});

app.get('/dailysongdata', (req, res) => {
  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  res.status(200).json({
    song: randomSong,
    links: {
      home: "http://localhost:8000/",
      dailysong: "http://localhost:8000/dailysong",
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
