import { useState } from "react";
import { submitEscapeTime } from "../../data/auth";
import "./timeSubmit.css";

export const TimeSubmitModal = ({ game, onClose, onSubmitted }) => {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    const min = parseInt(minutes, 10) || 0;
    const sec = parseInt(seconds, 10) || 0;

    if (min === 0 && sec === 0) {
      setError("Enter a valid time.");
      return;
    }
    if (sec >= 60) {
      setError("Seconds must be less than 60.");
      return;
    }
    if (min >= 60) {
      setError("Submissions over 1 hour are not accepted.");
      return;
    }
    const formattedTime = `0:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

    setIsSubmitting(true);
    submitEscapeTime(game.id, formattedTime)
      .then(() => {
        onSubmitted();
        onClose();
      })
      .catch(() => {
        setError("Something went wrong submitting your time");
        setIsSubmitting(false);
      });
  };
  return <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <h3>Submit Time for {game.title}</h3>
        <div className="time-inputs">
          <input
            type="number"
            min="0"
            max="59"
            placeholder="MM"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            max="59"
            placeholder="SS"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
        </div>
        {error && <p className="modal-error">{error}</p>}
        <div className="modal-actions">
          <button onClick={onClose} disabled={isSubmitting}>Cancel</button>
          <button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
    </div>
  </div>;
};
