import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getGames, getLeaderboard } from "../../../data/games";
import { RatingsContainer } from "../gameRating";
import "./leaderboard.css";

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

  const scrollPrev = () => {
    emblaApi && emblaApi.scrollPrev();
  };
const scrollNext = () => {
  if (!emblaApi) return;
  emblaApi.scrollNext();
};
  if (error) return <p>Something went wrong loading games</p>;

  return (
    // <div className="all-elements">
    //   <div className="embla">
    //     <div className="relative max-w-5xl mx-auto px-8">
    //       <div className="leaderboard-embla__viewport" ref={emblaRef}>
    //         <div className="leaderboard-embla__container">
    //           {games.map((game) => {
    //             const primaryImage = game.images?.find((img) => img.is_primary);

    //             return (
    //               <div key={game.id} className="leaderboard-embla__slide">
    //                 {primaryImage && (
    //                   <img
    //                     src={`http://localhost:8000/media/${primaryImage.image_path}`}
    //                     alt={game.title}
    //                     className="game-image"
    //                   />
    //                 )}
    //               </div>
    //             );
    //           })}
    //         </div>
    //       </div>
    //       <button
    //         onClick={scrollPrev}
    //         className="absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white"
    //       >
    //         ↑
    //       </button>
    //       <button
    //         onClick={scrollNext}
    //         className="absolute -right-2 top-1/12 -translate-y-1/2 w-9 h-9 rounded-full  bg-white"
    //       >
    //         ↓
    //       </button>

    <div className="all-elements">
      <div className="left-side-elements">
        {" "}
        <div className="relative max-w-3xl mx-auto px-15 leaderboard-embla__container">
          <div className="leaderboard-embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="leaderboard-embla__slide">
              {games.map((game) => {
                const primaryImage = game.images?.find((img) => img.is_primary);

                return (
                  <div key={game.id} className="flex-none bg-white">

                    {primaryImage && (
                      <img
                        src={`http://localhost:8000/media/${primaryImage.image_path}`}
                        alt={game.title}
                        className="game-image"
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
            ←
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-15 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full  bg-white"
          >
            →
          </button>

        </div>
      </div>
    </div>
  );
};
