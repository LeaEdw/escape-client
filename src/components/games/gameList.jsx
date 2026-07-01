import "./gameList.css"

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getGames } from "../../data/games";

export const GameCarousel = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    dragFree: true,
    loop: true,
    containScroll: false
  });

  useEffect(() => {
    getGames()
      .then((data) => {
        setGames(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (isLoading) return <p>Loading games...</p>;
  if (error) return <p>Something went wrong loading games</p>;

  return (
    <div className="relative max-w-5xl mx-auto px-8 embla__container">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 embla__slide">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex-none w-64 bg-white border rounded-xl p-4"
            >
              <h3 className="font-medium text-base mb-1">{game.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {game.description}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Difficulty: {game.difficulty} / 10
              </p>
              <p className="text-xs text-gray-500">
                Players: {game.number_of_players}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border bg-white"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="absolute -right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border bg-white"
      >
        ›
      </button>
    </div>
  );
};
