export type DayStatus = "not_started" | "in_progress" | "completed";

export type CourseDay = {
  id: number;
  title: string;
  durationLabel: string;
  status: DayStatus;
};

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
};

export const courseData = {
  id: "tot-3day",
  title: "Turnover Tax Made Simple",
  subtitle: "3-day certified course · Free",
  provider: "Kenya Revenue Authority",
  rating: 4.8,
  enrolledCount: 1240,
  days: [
    { id: 1, title: "Registration & Setup", durationLabel: "20 sec video + 1 quiz", status: "in_progress" },
    { id: 2, title: "Monthly Operations", durationLabel: "20 sec video + 1 quiz", status: "not_started" },
    { id: 3, title: "Compliance & Filing", durationLabel: "20 sec video + 1 quiz", status: "not_started" },
  ] satisfies CourseDay[],
  learnPoints: [
    "Confirm ToT eligibility",
    "Activate obligation on iTax",
    "Calculate and file monthly returns",
    "Avoid penalties and stay compliant",
  ],
};

export const dayContent: Record<number, { overview: string[]; why: string; takeaways: string[]; videoPublicId: string; quiz: QuizQuestion }> = {
  1: {
    overview: [
      "Whether your business qualifies for ToT",
      "How to activate ToT obligation on iTax",
      "Setting up simple daily records",
    ],
    why: "Getting registered correctly is the foundation of full compliance.",
    takeaways: [
      "ToT applies to businesses with KSh 1M–25M annual turnover.",
      "Activate obligation on iTax under Amend PIN Details.",
    ],
    videoPublicId: "tot/day1_registration_setup",
    quiz: {
      id: "day1-q1",
      prompt: "Which platform is used to activate your ToT obligation?",
      options: [
        { id: "A", label: "iTax" },
        { id: "B", label: "WhatsApp Status" },
        { id: "C", label: "Email to KRA" },
      ],
      correctOptionId: "A",
      explanation: "Correct! ToT obligation is activated on iTax.",
    },
  },
  2: {
    overview: [
      "How to track daily gross sales and turnover",
      "How ToT is calculated from gross turnover, not profit",
      "How to prepare your monthly return before filing",
    ],
    why: "Consistent daily tracking prevents filing errors and late corrections.",
    takeaways: [
      "Use gross turnover as the tax base, not net profit.",
      "Keep daily sales records up to date to simplify monthly returns.",
    ],
    videoPublicId: "tot/day2_monthly_operations",
    quiz: {
      id: "day2-q1",
      prompt: "ToT is calculated on which value?",
      options: [
        { id: "A", label: "Net profit after expenses" },
        { id: "B", label: "Gross turnover" },
        { id: "C", label: "Year-end balance only" },
      ],
      correctOptionId: "B",
      explanation: "Correct! ToT is based on gross turnover, not profit.",
    },
  },
  3: {
    overview: [
      "File and pay ToT by the 20th of the following month",
      "Generate PRN and complete payment through supported channels",
      "Keep clean records for compliance consistency",
    ],
    why: "Timely filing and payment protect your business from avoidable penalties.",
    takeaways: [
      "Submit return and pay on or before the 20th of the following month.",
      "Generate PRN first, then complete payment and retain records.",
    ],
    videoPublicId: "vid3",
    quiz: {
      id: "day3-q1",
      prompt: "When should ToT be filed and paid?",
      options: [
        { id: "A", label: "By the 20th of the following month" },
        { id: "B", label: "Only at year end" },
        { id: "C", label: "Any time before December" },
      ],
      correctOptionId: "A",
      explanation: "Correct! File and pay by the 20th of the following month.",
    },
  },
};

export function getCompletion(days: CourseDay[]) {
  const completedDays = days.filter((d) => d.status === "completed").length;
  return {
    completedDays,
    totalDays: days.length,
    percent: Math.round((completedDays / days.length) * 100),
  };
}
