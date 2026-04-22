import { Clock3 } from "lucide-react";

const buttonClass =
  "rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

type TimerScreenProps = {
  selectedDurationLabel: string;
  secondsLeft: number;
  isRunning: boolean;
  hasStarted: boolean;
  isFinished: boolean;
  onChangeTime: () => void;
  onStart: () => void;
  onPauseResume: () => void;
  onReset: () => void;
};

function formatTime(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function TimerScreen({
  selectedDurationLabel,
  secondsLeft,
  isRunning,
  hasStarted,
  isFinished,
  onChangeTime,
  onStart,
  onPauseResume,
  onReset,
}: TimerScreenProps) {
  return (
    <>
      <div className="mb-5 flex justify-start">
        <button
          type="button"
          onClick={onChangeTime}
          className="font-nunito inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase leading-none tracking-[0.14em] text-stone-600 ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:bg-stone-100"
        >
          <Clock3 className="h-3 w-3 shrink-0" strokeWidth={2.2} />
          <span className="leading-none">Change time</span>
        </button>
      </div>

      <p className="mb-3 text-sm uppercase tracking-[0.14em] text-orange-700">
        {selectedDurationLabel}
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
          onClick={onStart}
          disabled={hasStarted || isFinished}
          className={`${buttonClass} bg-orange-600 text-white hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-orange-700`}
        >
          Start
        </button>

        <button
          type="button"
          onClick={onPauseResume}
          disabled={!hasStarted || isFinished}
          className={`${buttonClass} bg-stone-700 text-white hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-stone-800`}
        >
          {isRunning ? "Pause" : "Resume"}
        </button>

        <button
          type="button"
          onClick={onReset}
          className={`${buttonClass} bg-white text-stone-700 ring-1 ring-black/10 hover:not-disabled:-translate-y-0.5 hover:not-disabled:bg-stone-100`}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default TimerScreen;
