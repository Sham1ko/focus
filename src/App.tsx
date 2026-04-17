import { useEffect, useState } from "react";
import "./App.css";

const INITIAL_SECONDS = 25;

function formatTime(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function App() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setSecondsLeft((currentSeconds) =>
        currentSeconds > 0 ? currentSeconds - 1 : 0,
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft !== 0 || !isRunning) {
      return;
    }

    setIsRunning(false);
    setIsFinished(true);
  }, [isRunning, secondsLeft]);

  function handleStart() {
    setHasStarted(true);
    setIsFinished(false);
    setIsRunning(true);
  }

  function handlePauseResume() {
    setIsRunning((currentValue) => !currentValue);
  }

  function handleReset() {
    setSecondsLeft(INITIAL_SECONDS);
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
  }

  return (
    <main className="timer-page">
      <section className="timer-card">
        <p className="timer-label">simple timer</p>
        <h1 className="timer-display">{formatTime(secondsLeft)}</h1>
        {isFinished ? <p className="timer-finished">finished</p> : null}

        <div className="timer-actions">
          <button
            type="button"
            onClick={handleStart}
            disabled={hasStarted || isFinished}
          >
            Start
          </button>

          <button
            type="button"
            onClick={handlePauseResume}
            disabled={!hasStarted || isFinished}
          >
            {isRunning ? "Pause" : "Resume"}
          </button>

          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
