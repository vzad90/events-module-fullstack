'use client';

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/Button";
import { EventRegistrationForm } from "./registration-form";

interface RegistrationSectionProps {
  eventId: string;
  eventTitle: string;
}

export function RegistrationSection({
  eventId,
  eventTitle,
}: RegistrationSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleOpen() {
    setSuccessMessage(null);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleSuccess(message: string) {
    setSuccessMessage(message || "You have successfully registered for this event.");
  }

  return (
    <>
      <div className="mt-1 flex gap-3">
        <Button type="button" onClick={handleOpen}>
          Register
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={`Register for ${eventTitle}`}
        description="Fill in your details to register for this event."
      >
        {successMessage ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-800">{successMessage}</p>
            <div className="flex justify-end">
              <Button type="button" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <EventRegistrationForm
            eventId={eventId}
            onSuccess={handleSuccess}
          />
        )}
      </Modal>
    </>
  );
}

