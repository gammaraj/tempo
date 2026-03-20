"use client";

import { useMemo } from "react";
import type { Task, Project, Settings } from "@/lib/types";
import { generateSmartPlan, type ScoredTask, type DayPlan } from "@/lib/smartplan";

function formatDuration(ms: number): string {
  const totalMin = Math.floor(ms / 60000);
  if (totalMin < 60) return `${totalMin}m`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function TaskRow({
  st,
  onStartTask,
  workDurationMin,
}: {
  st: ScoredTask;
  onStartTask: (id: string) => void;
  workDurationMin: number;
}) {
  const t = st.task;
  const subtaskProgress = t.subtasks && t.subtasks.length > 0
    ? `${t.subtasks.filter((s) => s.completed).length}/${t.subtasks.length}`
    : null;

  return (
    <div
      className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1a2d4a] ${
        st.overdue ? "border-l-2 border-red-400" : st.atRisk ? "border-l-2 border-amber-400" : ""
      }`}
      onClick={() => onStartTask(t.id)}
    >
      {/* Project color dot */}
      {st.projectColor && (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: st.projectColor }}
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
            {t.title}
          </span>
          {st.overdue && (
            <span className="text-[10px] font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">
              Overdue
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[11px] text-slate-400 dark:text-slate-500">{st.projectName}</span>
          {t.sessions > 0 && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              · {t.sessions} session{t.sessions !== 1 ? "s" : ""} ({formatDuration(t.timeSpent)})
            </span>
          )}
          {subtaskProgress && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              · {subtaskProgress} subtasks
            </span>
          )}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={(e) => { e.stopPropagation(); onStartTask(t.id); }}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
        title="Start this task"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}

function DaySection({
  day,
  onStartTask,
  workDurationMin,
}: {
  day: DayPlan;
  onStartTask: (id: string) => void;
  workDurationMin: number;
}) {
  const isToday = day.label === "Today";
  const totalTime = day.tasks.length * workDurationMin;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-semibold ${isToday ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-200"}`}>
            {day.label}
          </h3>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {day.date}
          </span>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          {day.tasks.length} task{day.tasks.length !== 1 ? "s" : ""} · ~{totalTime}m
        </span>
      </div>
      {day.tasks.length > 0 ? (
        <div className="space-y-0.5">
          {day.tasks.map((st) => (
            <TaskRow key={st.task.id} st={st} onStartTask={onStartTask} workDurationMin={workDurationMin} />
          ))}
        </div>
      ) : (
        <div className="px-3 py-3 text-sm text-slate-400 dark:text-slate-500 italic">
          No tasks planned
        </div>
      )}
    </div>
  );
}

export default function SmartPlan({
  tasks,
  projects,
  settings,
  onStartTask,
}: {
  tasks: Task[];
  projects: Project[];
  settings: Settings;
  onStartTask: (id: string) => void;
}) {
  const plan = useMemo(
    () => generateSmartPlan(tasks, projects, settings),
    [tasks, projects, settings],
  );

  const workDurationMin = Math.round(settings.workDuration / 60_000);

  return (
    <div className="p-4 space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-slate-50 dark:bg-[#131d30] rounded-xl px-3 py-2.5 text-center">
          <div className="text-lg font-bold text-slate-800 dark:text-white">{plan.summary.totalTasks}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Open Tasks</div>
        </div>
        <div className="bg-slate-50 dark:bg-[#131d30] rounded-xl px-3 py-2.5 text-center">
          <div className="text-lg font-bold text-slate-800 dark:text-white">{plan.summary.daysNeeded}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Days to Clear</div>
        </div>
        {plan.summary.overdueCount > 0 && (
          <div className="bg-red-50 dark:bg-red-900/15 rounded-xl px-3 py-2.5 text-center">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{plan.summary.overdueCount}</div>
            <div className="text-[11px] text-red-500 dark:text-red-400">Overdue</div>
          </div>
        )}
        {plan.summary.atRiskCount > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/15 rounded-xl px-3 py-2.5 text-center">
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{plan.summary.atRiskCount}</div>
            <div className="text-[11px] text-amber-500 dark:text-amber-400">At Risk</div>
          </div>
        )}
      </div>

      {/* Capacity note */}
      <div className="text-[11px] text-slate-400 dark:text-slate-500 px-1">
        Based on {settings.dailyGoal} session{settings.dailyGoal !== 1 ? "s" : ""}/day × {workDurationMin}min
      </div>

      {/* Day-by-day plan */}
      {plan.days.length > 0 ? (
        plan.days.map((day) => (
          <DaySection key={day.date} day={day} onStartTask={onStartTask} workDurationMin={workDurationMin} />
        ))
      ) : (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500">
          <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">All clear!</p>
          <p className="text-xs mt-1">No tasks to plan. Add some tasks to get started.</p>
        </div>
      )}

      {/* Unscheduled overflow */}
      {plan.unscheduled.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-1.5 px-1">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Backlog
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              {plan.unscheduled.length} tasks beyond {plan.days.length}-day window
            </span>
          </div>
          <div className="space-y-0.5 opacity-75">
            {plan.unscheduled.map((st) => (
              <TaskRow key={st.task.id} st={st} onStartTask={onStartTask} workDurationMin={workDurationMin} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
