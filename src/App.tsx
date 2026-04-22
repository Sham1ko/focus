import { useEffect, useState } from "react";
import "./App.css";
import DurationPickerScreen from "./screens/DurationPickerScreen";
import TimerScreen from "./screens/TimerScreen";
import type { DurationOption } from "./screens/types";

const PROD_DURATION_OPTIONS: DurationOption[] = [
  {
    id: "5-minutes",
    durationInSeconds: 5 * 60,
    value: 5,
    pickerUnitLabel: "minutes",
    focusUnitLabel: "minute",
  },
  {
    id: "10-minutes",
    durationInSeconds: 10 * 60,
    value: 10,
    pickerUnitLabel: "minutes",
    focusUnitLabel: "minute",
  },
  {
    id: "15-minutes",
    durationInSeconds: 15 * 60,
    value: 15,
    pickerUnitLabel: "minutes",
    focusUnitLabel: "minute",
  },
  {
    id: "25-minutes",
    durationInSeconds: 25 * 60,
    value: 25,
    pickerUnitLabel: "minutes",
    focusUnitLabel: "minute",
  },
  {
    id: "30-minutes",
    durationInSeconds: 30 * 60,
    value: 30,
    pickerUnitLabel: "minutes",
    focusUnitLabel: "minute",
  },
  {
    id: "60-minutes",
    durationInSeconds: 60 * 60,
    value: 60,
    pickerUnitLabel: "minutes",
    focusUnitLabel: "minute",
  },
];

const DURATION_OPTIONS = import.meta.env.DEV
  ? [
    {
      id: "5-seconds",
      durationInSeconds: 5,
      value: 5,
      pickerUnitLabel: "seconds",
      focusUnitLabel: "second",
    },
    ...PROD_DURATION_OPTIONS,
  ]
  : PROD_DURATION_OPTIONS;
const DEFAULT_DURATION =
  DURATION_OPTIONS.find((option) => option.durationInSeconds === 25 * 60) ??
  DURATION_OPTIONS[0];

function App() {
  const [screen, setScreen] = useState<"picker" | "timer">("picker");
  const [selectedDuration, setSelectedDuration] = useState(DEFAULT_DURATION);
  const [secondsLeft, setSecondsLeft] = useState(
    DEFAULT_DURATION.durationInSeconds,
  );
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
    setSecondsLeft(selectedDuration.durationInSeconds);
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
  }

  function handleSelectDuration(duration: DurationOption) {
    setSelectedDuration(duration);
    setSecondsLeft(duration.durationInSeconds);
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
    setScreen("timer");
  }

  function handleChangeTime() {
    setIsRunning(false);
    setHasStarted(false);
    setIsFinished(false);
    setSecondsLeft(selectedDuration.durationInSeconds);
    setScreen("picker");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fff7ed_0%,#ffedd5_35%,#fed7aa_100%)] px-6 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-stone-900">
      <section className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_24px_60px_rgba(120,53,15,0.16)] backdrop-blur-md sm:p-8">
        {screen === "picker" ? (
          <DurationPickerScreen
            durationOptions={DURATION_OPTIONS}
            selectedDurationInSeconds={selectedDuration.durationInSeconds}
            onSelectDuration={handleSelectDuration}
          />
        ) : (
          <TimerScreen
            selectedDurationLabel={`${selectedDuration.value} ${selectedDuration.focusUnitLabel} focus`}
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
