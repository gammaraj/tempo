// ===== Types =====

export interface Settings {
  workDuration: number; // in milliseconds
  breakDuration: number; // in milliseconds (was resetThreshold)
  inactivityThreshold: number; // in milliseconds
  dailyGoal: number;
  autoStartEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface DailyGoalData {
  date: string;
  sessionCount: number;
  streak: number;
  lastStreakUpdate: string | null;
}

export interface DayHistory {
  sessionCount: number;
  goalMet: boolean;
  timestamp: number;
}

export interface StreakHistory {
  days: Record<string, DayHistory>;
}

export type TimerMode = "work" | "break" | "idle";

export type TimerStatus =
  | "idle"
  | "running"
  | "paused"
  | "break"
  | "completed";

export const DEFAULT_SETTINGS: Settings = {
  workDuration: 30 * 60 * 1000, // 30 minutes
  breakDuration: 5 * 60 * 1000, // 5 minutes
  inactivityThreshold: 1 * 60 * 1000, // 1 minute
  dailyGoal: 3,
  autoStartEnabled: true,
  notificationsEnabled: true,
};
