import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getGames, getLeaderboard } from "../../../data/games";
import { RatingsContainer } from "../gameRating";
import "./leaderboard.css";
import { DifficultyComponentStandalone } from "../gameData";
import { AverageEscapeTime } from "./averageEscape";
import { motion, AnimatePresence } from "framer-motion";
import { LeaderboardTable } from "./leaderboardTable";

export const LeaderboardPage = () => {
  const [times, setTimes] = useState([]);
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
    if (!selectedGame) return;
    setIsLoading(true);
    getLeaderboard(selectedGame.id)
      .then((data) => {
        setTimes(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load leaderboard:", err);
        setError(true);
        setIsLoading(false);
      });
  }, [selectedGame?.id]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
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

  const scrollPrev = () => {
    emblaApi && emblaApi.scrollPrev();
  };
  const scrollNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  };
  if (error) return <p>Something went wrong loading game details.</p>;

  return (
    <div className="leaderboard-elements">
      <div className="left-side-elements" key="left-side">
        <div className="relative max-w-3xl mx-auto px-15 leaderboard-embla__container">
          <div className="leaderboard-carousel">
            <div
              className="leaderboard-embla__viewport overflow-hidden"
              ref={emblaRef}
            >
              <div className="leaderboard-embla__slide">
                {games.map((game) => {
                  const primaryImage = game.images?.find(
                    (img) => img.is_primary,
                  );

                  return (
                    <div key={game.id} className="flex-none ">
                      {primaryImage && (
                        <img
                          src={`http://localhost:8000/media/${primaryImage.image_path}`}
                          alt={game.title}
                          className="game-image"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              onClick={scrollPrev}
              className="absolute -left-7 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full"
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-7 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full"
            >
              →
            </button>
          </div>
          <AnimatePresence mode="wait">
            {selectedGame && (
              <motion.div
                key={selectedGame.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="leaderboard-game-details">
                  <div className="game-details-ls">
                    <div className="game-title">{selectedGame.title}</div>
                    <div className="sbs">
                      <DifficultyComponentStandalone game={selectedGame} />
                      <AverageEscapeTime game={selectedGame} />
                    </div>
                    <RatingsContainer game={selectedGame}/>
                  </div>
                  <div className="game-summary solid-bg">
                    <span className="game-detail-rs">
                      {selectedGame.description}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="leaderboard-right" key="right-side">
        <LeaderboardTable game={selectedGame} />
      </div>
    </div>
  );
};
