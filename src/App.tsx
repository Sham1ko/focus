import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import "./App.css";

const DURATION_OPTIONS = [5, 10, 15, 25, 30, 60];
const DEFAULT_MINUTES = 25;
const buttonClass =
  "rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

function formatTime(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function App() {
  const [screen, setScreen] = useState<"picker" | "timer">("picker");
  const [selectedMinutes, setSelectedMinutes] = useState(DEFAULT_MINUTES);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_MINUTES * 60);
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
    setSecondsLeft(selectedMinutes * 60);
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
  }

  function handleSelectDuration(minutes: number) {
    setSelectedMinutes(minutes);
    setSecondsLeft(minutes * 60);
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
    setScreen("timer");
  }

  function handleChangeTime() {
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
    setSecondsLeft(selectedMinutes * 60);
    setScreen("picker");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fff7ed_0%,#ffedd5_35%,#fed7aa_100%)] px-6 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-stone-900">
      <section className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_24px_60px_rgba(120,53,15,0.16)] backdrop-blur-md sm:p-8">
        {screen === "picker" ? (
          <>
            <p className="mb-3 text-sm uppercase tracking-[0.14em] text-orange-700">
              focus
            </p>
            <h1 className="m-0 text-4xl leading-tight text-orange-950 sm:text-5xl">
              Choose your time
            </h1>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Pick one of the ready-made focus sessions.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {DURATION_OPTIONS.map((minutes) => {
                const isSelected = selectedMinutes === minutes;

                return (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => handleSelectDuration(minutes)}
                    className={`rounded-2xl border px-4 py-4 text-left transition hover:-translate-y-0.5 ${isSelected
                      ? "border-orange-300 bg-orange-50 text-orange-950 shadow-[0_12px_30px_rgba(234,88,12,0.12)]"
                      : "border-stone-200 bg-white text-stone-700 hover:border-orange-200 hover:bg-orange-50/60"
                      }`}
                  >
                    <span className="block text-2xl font-semibold leading-none">
                      {minutes}
                    </span>
                    <span className="mt-2 block text-xs uppercase tracking-[0.14em] opacity-70">
                      minutes
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="mb-5 flex justify-start">
              <button
                type="button"
                onClick={handleChangeTime}
                className="font-nunito inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase leading-none tracking-[0.14em] text-stone-600 ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:bg-stone-100"
              >
                <Clock3 className="h-3 w-3 shrink-0" strokeWidth={2.2} />
                <span className="leading-none">Change time</span>
              </button>
            </div>

            <p className="mb-3 text-sm uppercase tracking-[0.14em] text-orange-700">
              {selectedMinutes} minute focus
            </p>
            <h1 className="m-0 text-[clamp(3rem,12vw,4.8rem)] leading-none text-orange-950">
              {formatTime(secondsLeft)}
            </h1>
            {isFinished ? (
              <p className="mt-3 text-base text-green-700">finished</p>
            ) : null}

            <div className="mt-7 grid gap-3">
              <button
                type="button"
                onClick={handleStart}
                disabled={hasStarted || isFinished}
                className={`${buttonClass} bg-orange-600 text-white hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-orange-700`}
              >
                Start
              </button>

              <button
                type="button"
                onClick={handlePauseResume}
                disabled={!hasStarted || isFinished}
                className={`${buttonClass} bg-stone-700 text-white hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-stone-800`}
              >
                {isRunning ? "Pause" : "Resume"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className={`${buttonClass} bg-white text-stone-700 ring-1 ring-black/10 hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-stone-100`}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
