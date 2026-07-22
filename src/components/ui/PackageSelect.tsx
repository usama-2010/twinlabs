"use client";

import { contactPackageOptions } from "@/lib/content/pricing";

type PackageSelectProps = {
  error?: string;
};

export function PackageSelect({ error }: PackageSelectProps) {
  return (
    <fieldset className="m-0 block border-0 p-0 pb-1 text-sm">
      <legend className="mono-label block w-full">Project package</legend>

      <div className="contact-form-packages min-w-0">
        <div className="form-package-grid mt-2">
        {contactPackageOptions.map((option) => (
          <label
            key={option.value}
            className={`form-package-option${option.value === "not-sure" ? " form-package-option-wide" : ""}`}
          >
            <input
              type="radio"
              name="projectPackage"
              value={option.value}
              className="form-package-input"
            />

            {option.common ? <span className="form-package-badge">Most common</span> : null}

            <span className="form-package-title">{option.title}</span>
            <span className="form-package-range">{option.range}</span>
          </label>
        ))}
        </div>

        {error ? <span className="mt-2 block text-xs text-red-600">{error}</span> : null}
      </div>
    </fieldset>
  );
}