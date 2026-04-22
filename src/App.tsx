import { useEffect, useState } from "react";
import "./App.css";
import DurationPickerScreen from "./screens/DurationPickerScreen";
import TimerScreen from "./screens/TimerScreen";

const DURATION_OPTIONS = [5, 10, 15, 25, 30, 60];
const DEFAULT_MINUTES = 25;

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
          <DurationPickerScreen
            durationOptions={DURATION_OPTIONS}
            selectedMinutes={selectedMinutes}
            onSelectDuration={handleSelectDuration}
          />
        ) : (
          <TimerScreen
            selectedMinutes={selectedMinutes}
            secondsLeft={secondsLeft}
            isRunning={isRunning}
            hasStarted={hasStarted}
            isFinished={isFinished}
            onChangeTime={handleChangeTime}
            onStart={handleStart}
            onPauseResume={handlePauseResume}
            onReset={handleReset}
          />
        )}
      </section>
    </main>
  );
}

export default App;
