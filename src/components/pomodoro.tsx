import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// フォーカス時間と休憩時間の設定（秒単位）
// 定数として外に出すことで、後から値を変えやすくする
const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

export default function Pomodoro() {
  const [remainingSeconds, setRemainingSeconds] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusTime, setIsFocusTime] = useState(true);

  // カウントダウン処理
  // isRunning だけを依存にすることで、インターバルの無駄な再生成を避ける
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      // 関数形式の setState を使い、最新の値を確実に参照する
      setRemainingSeconds((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // フェーズ切り替え処理（カウントダウンとは別の関心なので effect を分離）
  // remainingSeconds が 0 になったときだけ動作する
  useEffect(() => {
    if (remainingSeconds > 0) return;

    setIsRunning(false);
    // isFocusTime を読んで次のフェーズを決めるため、依存配列に含める必要がある
    const nextIsFocusTime = !isFocusTime;
    setIsFocusTime(nextIsFocusTime);
    setRemainingSeconds(nextIsFocusTime ? FOCUS_SECONDS : BREAK_SECONDS);
  }, [remainingSeconds, isFocusTime]);

  const startPause = () => setIsRunning((r) => !r);

  const reset = () => {
    setIsRunning(false);
    setIsFocusTime(true);
    setRemainingSeconds(FOCUS_SECONDS);
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Pomodoro Timer</h1>
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <div className="mb-4 text-2xl">
            {isFocusTime ? "Focus Time!" : "Break Time!"}
          </div>
          <div className="mb-6 font-mono text-6xl">
            {formatTime(remainingSeconds)}
          </div>
          <div className="space-x-4">
            <Button size="lg" onClick={startPause}>
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button size="lg" onClick={reset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
