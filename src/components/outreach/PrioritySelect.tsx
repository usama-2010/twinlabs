"use client";

const PRIORITY_OPTIONS = [
  { value: "", label: "Auto" },
  { value: "high", label: "High", dotClass: "bg-[#e05252]" },
  { value: "medium", label: "Medium", dotClass: "bg-[#d4a017]" },
  { value: "low", label: "Low", dotClass: "bg-teal-800" },
] as const;

type PrioritySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function PrioritySelect({ value, onChange }: PrioritySelectProps) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mono-label mb-2 block">Priority</legend>

      <div className="outreach-segmented" role="group" aria-label="Priority">
        {PRIORITY_OPTIONS.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value || "auto"}
              type="button"
              onClick={() => onChange(option.value)}
              data-selected={selected ? "true" : "false"}
              data-priority={option.value || "auto"}
              aria-pressed={selected}
              className="outreach-segment"
            >
              {"dotClass" in option && option.dotClass ? (
                <span
                  className={`outreach-segment-dot h-2 w-2 shrink-0 rounded-full ${option.dotClass}`}
                  aria-hidden="true"
                />
              ) : null}
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
