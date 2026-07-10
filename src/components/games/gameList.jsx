import "./gameList.css";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getGames } from "../../data/games";
import { RatingsContainer } from "./gameRating";
import { GameData } from "./gameData";
import { CommentSection } from "../user/comments";
import { motion, AnimatePresence } from "framer-motion";

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
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [selectedGame]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (isLoading) return <p>Loading games...</p>;
  if (error) return <p>Something went wrong loading games</p>;

  return (
    <div className="all-elements">
      <div className="left-side-elements">
        {" "}
        <div className="relative max-w-5xl mx-auto px-8 embla__container-carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 embla__slide">
              {games.map((game) => {
                const primaryImage = game.images?.find((img) => img.is_primary);

                return (
                  <div key={game.id} className="flex-none w-100  p-4">
                    <h3 className="game_title mb-5">{game.title}</h3>

                    {primaryImage && (
                      <img
                        src={`http://localhost:8000/media/${primaryImage.image_path}`}
                        alt={game.title}
                        className="w-full h-80 object-cover border mb-5"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-10 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full"
          >
            →
          </button>
        </div>
        <GameData game={selectedGame} />
      </div>

      <div className="right-side-elements">
        <RatingsContainer game={selectedGame} />
        <CommentSection game={selectedGame} />
      </div>
    </div>
  );
};
