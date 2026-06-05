import { useState } from "react";

// localStorage のキー。定数として外に出すことで、変更箇所を一箇所に集約する
const STORAGE_KEY_FOCUS = "pomodoro_focus_seconds";
const STORAGE_KEY_BREAK = "pomodoro_break_seconds";

// デフォルト値（秒単位）
const DEFAULT_FOCUS_SECONDS = 25 * 60;
const DEFAULT_BREAK_SECONDS = 5 * 60;

// 入力値のバリデーション。1分以上60分以下を有効範囲とする
// 0や負の値、極端に大きな値を防ぐためのガード
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const clampMinutes = (value: number): number =>
  Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, value));

// localStorage から秒数を読み出す。
// 値がない・不正な値の場合はデフォルト値を返す。
// localStorage は文字列しか保存できないため、数値への変換とバリデーションが必要
const loadSeconds = (key: string, defaultValue: number): number => {
  const stored = localStorage.getItem(key);
  if (stored === null) return defaultValue;
  const parsed = Number(stored);
  // NaN や範囲外の値はデフォルトにフォールバック
  if (!Number.isFinite(parsed) || parsed <= 0) return defaultValue;
  return parsed;
};

export type PomodoroSettings = {
  focusSeconds: number;
  breakSeconds: number;
  // 分単位で設定を更新する関数。UIは分単位で扱うほうが自然なため
  setFocusMinutes: (minutes: number) => void;
  setBreakMinutes: (minutes: number) => void;
};

export const usePomodoroSettings = (): PomodoroSettings => {
  const [focusSeconds, setFocusSeconds] = useState<number>(() =>
    loadSeconds(STORAGE_KEY_FOCUS, DEFAULT_FOCUS_SECONDS),
  );
  const [breakSeconds, setBreakSeconds] = useState<number>(() =>
    loadSeconds(STORAGE_KEY_BREAK, DEFAULT_BREAK_SECONDS),
  );

  const setFocusMinutes = (minutes: number): void => {
    const clamped = clampMinutes(minutes);
    const seconds = clamped * 60;
    setFocusSeconds(seconds);
    localStorage.setItem(STORAGE_KEY_FOCUS, String(seconds));
  };

  const setBreakMinutes = (minutes: number): void => {
    const clamped = clampMinutes(minutes);
    const seconds = clamped * 60;
    setBreakSeconds(seconds);
    localStorage.setItem(STORAGE_KEY_BREAK, String(seconds));
  };

  return { focusSeconds, breakSeconds, setFocusMinutes, setBreakMinutes };
};
