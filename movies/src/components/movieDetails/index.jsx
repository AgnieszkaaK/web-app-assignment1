import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, credits }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip, backgroundColor: "pink" }} />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip
            label="Production Countries"
            sx={{ ...chip, backgroundColor: "pink" }}
          />
        </li>
        {movie.production_countries &&
          movie.production_countries.map((country) => (
            <li key={country.name}>
              <Chip label={country.name} sx={{ ...chip }} />
            </li>
          ))}
      </Paper>

      {/* Rating, Runtime, Budget */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip
            icon={<StarRate />}
            label={`Rating: ${movie.vote_average ?? "N/A"}`}
            sx={{ ...chip, backgroundColor: "pink" }}
            variant="outlined"
          />
        </li>
        <li>
          <Chip
            icon={<AccessTimeIcon />}
            label={`Runtime: ${movie.runtime ?? "N/A"} min`}
            sx={{ ...chip }}
            variant="outlined"
          />
        </li>
        <li>
          <Chip
            icon={<MonetizationIcon />}
            label={`Budget: ${
              typeof movie.budget === "number"
                ? `$${movie.budget.toLocaleString()}`
                : "N/A"
            }`}
            sx={{ ...chip }}
            variant="outlined"
          />
        </li>
      </Paper>

      {credits && credits.cast && (
        <Paper component="ul" sx={{ ...root }}>
          <li>
            <Chip label="Cast" sx={{ ...chip, backgroundColor: "pink" }} />
          </li>
          {credits.cast.slice(0, 10).map((actor) => (
            <li key={actor.cast_id}>
              <Chip
                label={`${actor.name} as ${actor.character}`}
                sx={{ ...chip }}
              />
            </li>
          ))}
        </Paper>
      )}

      <Fab
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
          backgroundColor: "pink",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Fab
        variant="extended"
        onClick={() => {
          setDrawerOpen(true);
          window.location.href = `/movie/${movie.id}/recommendations`;
        }}
        sx={{
          backgroundColor: "pink",
          position: "fixed",
          bottom: "1em",
          left: "1em",
        }}
      >
        <NavigationIcon />
        Recommendations
      </Fab>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;