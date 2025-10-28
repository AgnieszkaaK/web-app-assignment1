import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";

const UpcomingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  return (
<PageTemplate
  title="Upcoming Movies"
  movies={movies}
  action={(movie) => <AddToWatchListIcon movie={movie} />}
/>
  );
};

export default UpcomingMoviesPage;