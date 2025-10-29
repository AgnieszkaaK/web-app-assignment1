import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/tmdb-api";

function MovieCreditsPage() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  if (isLoading) return <p>Loading credits...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {data.cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCreditsPage;