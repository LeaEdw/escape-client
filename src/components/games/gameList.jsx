import "./gameList.css";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getGames } from "../../data/games";
import { RatingsContainer } from "./gameRating";
import { GameData } from "./gameData";

export const GameCarousel = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    draggable: false,
    loop: true,
  });
  const [selectedGame, setSelectedGame] = useState(null);

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

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedGame(games[index]);
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, games]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  //   const goToPrev = () => emblaApi && emblaApi?.goToPrev()
  //   const goToNext = () => emblaApi && emblaApi?.goToNext()

  if (isLoading) return <p>Loading games...</p>;
  if (error) return <p>Something went wrong loading games</p>;

  return (
    <div className="all-elements">
      <div className="left-side-elements">
        {" "}
        <div className="relative max-w-5xl mx-auto px-8 embla__container">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 embla__slide">
              {games.map((game) => {
                const primaryImage = game.images?.find((img) => img.is_primary);

                return (
                  <div key={game.id} className="flex-none w-100 bg-white p-4">
                    <h3 className="game_title mb-5">{game.title}</h3>

                    {primaryImage && (
                      <img
                        src={`http://localhost:8000/media/${primaryImage.image_path}`}
                        alt={game.title}
                        className="w-full h-80 object-cover border mb-5"
                      />
                    )}
                    {/* <div className="game-details">
                    <div className="left-side-items">
                      <div className="game-difficulty">
                        Difficulty {game.difficulty} / 10
                      </div>
                      <div className="text-xs text-gray-500">
                        {game.number_of_players} players
                      </div>
                    </div>
                    <div className="right-side-items">Best Time:</div>
                  </div> */}
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-15 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full  bg-white"
          >
            ›
          </button>
        </div>{" "}
        <GameData game={selectedGame} />
      </div>

      <div className="right-side-elements">
        <RatingsContainer game={selectedGame} />
      </div>
    </div>
  );
};
