'use client';

import { useState } from "react";
import { registerForEvent } from "@/lib/api/events";

interface EventRegistrationFormProps {
  eventId: string;
  onSuccess: (message: string) => void;
}

interface FormState {
  fullName: string;
  email: string;
  phoneCode: string;
  phoneLocal: string;
}

export function EventRegistrationForm({
  eventId,
  onSuccess,
}: EventRegistrationFormProps) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phoneCode: "+44",
    phoneLocal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { name, value } = event.target;

    if (name === "phoneLocal") {
      const digitsOnly = value.replace(/\D/g, "");
      const limited = digitsOnly.slice(0, 12);
      const formatted =
        limited.length <= 3
          ? limited
          : limited.length <= 6
          ? `${limited.slice(0, 3)} ${limited.slice(3)}`
          : `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;

      setForm((previous) => ({
        ...previous,
        phoneLocal: formatted,
      }));
      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleCodeChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const { value } = event.target;

    setForm((previous) => ({
      ...previous,
      phoneCode: value,
    }));
  }

  function validate(values: FormState): string | null {
    if (
      !values.fullName.trim() ||
      !values.email.trim() ||
      !values.phoneLocal.trim()
    ) {
      return "All fields are required.";
    }

    const email = values.email.trim();
    const hasAt = email.includes("@");
    const hasDot = email.includes(".");

    if (!hasAt || !hasDot || email.length < 5) {
      return "Please enter a valid email address.";
    }

    const phoneDigits = values.phoneLocal.replace(/\D/g, "");

    if (phoneDigits.length < 7) {
      return "Please enter a valid phone number.";
    }

    return null;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const validationError = validate(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await registerForEvent(eventId, {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: `${form.phoneCode} ${form.phoneLocal.trim()}`,
      });

      onSuccess(result.message);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="fullName"
          className="text-sm font-medium text-neutral-800"
        >
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange}
          className="h-10 rounded-full border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0"
          placeholder="Your full name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-sm font-medium text-neutral-800"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="h-10 rounded-full border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0"
          placeholder="you@example.com"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-medium text-neutral-800">
          Phone
        </label>
        <div className="flex gap-2">
          <select
            name="phoneCode"
            value={form.phoneCode}
            onChange={handleCodeChange}
            className="h-10 rounded-full border border-neutral-300 bg-white pl-1 pr-1 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900 focus:ring-0"
          >
            <option value="+380">+380</option>
            <option value="+48">+48</option>
            <option value="+44">+44</option>
            <option value="+49">+49</option>
          </select>
          <input
            id="phone"
            name="phoneLocal"
            type="tel"
            value={form.phoneLocal}
            onChange={handleChange}
            className="flex-1 h-10 rounded-full border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0"
            placeholder="XX XXX XXXX"
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <div className="mt-1 flex justify-end gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {isSubmitting ? "Submitting..." : "Submit registration"}
        </button>
      </div>
    </form>
  );
}

