import React from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getMovie } from "../api/tmdb-api";
import MovieRecommendations from "../components/movieRecommendations";

export default function RecommendationsPage() {
  const { id } = useParams();

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight:'bold', textAlign:"center", fontFamily: 'Poppins' }}>
        Since you watched {movie.title}, here are some recommendations!
      </Typography>
      <MovieRecommendations movie={movie} />
    </>
  );
}