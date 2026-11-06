"use client";

import { useState } from "react";
import { Check, ChevronDown, Palette } from "lucide-react";
import { accents, type AccentChoice } from "@/data/accents";

export default function AccentPicker({ value, onChange }: { value: AccentChoice; onChange: (value: AccentChoice) => void }) {
  const [message, setMessage] = useState("");
  return (
    <details className="accent-picker">
      <summary><Palette size={15} aria-hidden="true" />Play with colour<ChevronDown className="accent-chevron" size={13} aria-hidden="true" /></summary>
      <div className="accent-controls">
        <fieldset>
          <legend>Try a colour for the whole portfolio.</legend>
          <div className="accent-swatches">
            {accents.map((accent) => (
              <button key={accent.id} type="button" className="accent-swatch" data-accent-choice={accent.id} aria-label={`${accent.label} palette`} aria-pressed={value === accent.id} onClick={() => { onChange(accent.id); setMessage(`${accent.label} palette selected`); }}>
                <span style={{ background: accent.light }}>{value === accent.id && <Check size={12} aria-hidden="true" />}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <span className="sr-only" role="status">{message}</span>
      </div>
    </details>
  );
}
