import type { DurationOption } from "./types";

type DurationPickerScreenProps = {
  durationOptions: DurationOption[];
  selectedDurationInSeconds: number;
  onSelectDuration: (duration: DurationOption) => void;
};

function DurationPickerScreen({
  durationOptions,
  selectedDurationInSeconds,
  onSelectDuration,
}: DurationPickerScreenProps) {
  return (
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
        {durationOptions.map((duration) => {
          const isSelected =
            selectedDurationInSeconds === duration.durationInSeconds;

          return (
            <button
              key={duration.id}
              type="button"
              onClick={() => onSelectDuration(duration)}
              className={`rounded-2xl border px-4 py-4 text-left transition hover:-translate-y-0.5 ${isSelected
                ? "border-orange-300 bg-orange-50 text-orange-950 shadow-[0_12px_30px_rgba(234,88,12,0.12)]"
                : "border-stone-200 bg-white text-stone-700 hover:border-orange-200 hover:bg-orange-50/60"
                }`}
            >
              <span className="block text-2xl font-semibold leading-none">
                {duration.value}
              </span>
              <span className="mt-2 block text-xs uppercase tracking-[0.14em] opacity-70">
                {duration.pickerUnitLabel}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default DurationPickerScreen;
