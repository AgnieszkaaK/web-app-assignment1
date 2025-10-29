import React, { useState } from "react";
import {
  Card, CardMedia, CardContent, Typography,
  InputLabel, MenuItem, TextField, FormControl, Select
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import img from '../../images/e4e900e23c9b37e19b83e132c83a8fc8.jpg';
import { getGenres, getLanguages } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesCard(props) {
  const { data: genreData, error: genreError, isPending: genrePending, isError: genreIsError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  const { data: languageData, error: langError, isPending: langPending, isError: langIsError } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });

  if (genrePending || langPending) return <Spinner />;
  if (genreIsError) return <h1>{genreError.message}</h1>;
  if (langIsError) return <h1>{langError.message}</h1>;

  const genres = genreData.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const languages = languageData;
  if (languages[0].english_name !== "All") {
    languages.unshift({ iso_639_1: "", english_name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => handleChange(e, "name", e.target.value);
  const handleGenreChange = (e) => handleChange(e, "genre", e.target.value);
  const handleLanguageChange = (e) => handleChange(e, "language", e.target.value);

  return (
    <Card sx={{ backgroundColor: "rgba(207, 198, 201, 0.94)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1" sx={{ fontFamily: "'Poppins'", fontWeight: 'bold' }}>
          <SearchIcon fontSize="large" />
          Filter for specific movies!
        </Typography>

        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.languageFilter}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
                {lang.english_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>

      <CardMedia sx={{ height: 300 }} image={img} title="Filter" />

      <CardContent>
        <Typography variant="h5" component="h1" sx={{ fontFamily: "'Poppins'" }}>
          <SearchIcon fontSize="large" />
          Filtering movies
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}