import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
import WriteReview from "../components/cardIcons/writeReview";

const PlaylistMoviesPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  const queries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const isPending = queries.find((q) => q.isPending === true);
  if (isPending) return <Spinner />;

  const movies = queries
    .map((q) => q.data)
    .filter(Boolean)
    .map((m) => {
      m.genre_ids = Array.isArray(m.genres) ? m.genres.map((g) => g.id) : [];
      return m;
    });

  return (
    <PageTemplate
      title="Playlist"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromPlaylist movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default PlaylistMoviesPage;