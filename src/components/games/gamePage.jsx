import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGames } from "../../data/games";
import { getUserProfile } from "../../data/auth";
import "./gameList.css";

export const GamePage = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState([]);
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
        <>
        <h1>This will be the game page</h1>
        </>
    )
}

/* The page layout needs to be designed, but will include a form where users can submit theirs ratings for the design, fun and difficulty...
- It would be fun to create a separate styling for each game if that looks ok
*/