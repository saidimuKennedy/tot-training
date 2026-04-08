export type HypecardsEventName =
  | "day_start"
  | "lesson_complete"
  | "quiz_submitted"
  | "course_completed"
  | "certificate_viewed";

export type HypecardsEventInput = {
  learnerId: string;
  eventName: HypecardsEventName;
  dayId?: number;
  metadata?: Record<string, string | number | boolean>;
};

export async function sendHypecardsEvent(input: HypecardsEventInput) {
  return {
    accepted: true,
    eventId: `mock_${Date.now()}`,
    provider: "hypecards-mock",
    input,
  };
}
