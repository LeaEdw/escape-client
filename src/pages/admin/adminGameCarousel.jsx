import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { getAllGamesForAdmin } from "../../data/admin";
import { motion, AnimatePresence } from "framer-motion";
import { confirmEditGame } from "./editGameNavigation";

export const AdminGameCarousel = ({isUnsaved, refreshTrigger}) => {
  const navigate = useNavigate();

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
    getAllGamesForAdmin()
      .then((data) => {
        setGames(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [refreshTrigger]);

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
    <div className="all-elements_admin">
      <div className="left-side-elements_admin">
        {" "}
        <div className="relative max-w-2xl mx-auto embla__container">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5 embla__slide">
              {games.map((game) => {
                const primaryImage = game.images?.find((img) => img.is_primary);

                return (
                  <div key={game.id} className={`slide_admin flex-none bg-white ${!game.active_status ? "opacity-40 grayscale" : ""}`}>
                    {primaryImage && (
                      <img
                        src={`http://localhost:8000/media/${primaryImage.image_path}`}
                        alt={game.title}
                        className="w-50 h-50 object-cover border mb-5"
                        onClick={() => {
                            confirmEditGame(
                                navigate,
                                game.id,
                                game.title,
                                isUnsaved
                            )
                        }}
                      />
                    )}
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
