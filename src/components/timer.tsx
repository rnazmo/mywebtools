import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// 時間を追加するボタンに使う秒数の一覧
// ここを変えるだけでボタンの種類を増減できる
const ADD_TIME_OPTIONS = [1, 5, 10, 30, 60, 300];

export default function Timer() {
  const [time, setTime] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // setInterval の戻り値の型をランタイム環境に依存せず取得するため
    // NodeJS.Timeout ではなく ReturnType<typeof setInterval> を使う
    let intervalId: ReturnType<typeof setInterval>;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const startStop = () => {
    // 残り時間が 0 のときは開始させない
    if (time > 0) {
      setIsRunning(!isRunning);
    }
  };

  const reset = () => {
    setTime(5 * 60);
    setIsRunning(false);
  };

  const addTime = (seconds: number) => {
    setTime((t) => t + seconds);
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Timer</h1>
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <div className="mb-6 font-mono text-6xl">{formatTime(time)}</div>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {ADD_TIME_OPTIONS.map((seconds) => (
              <Button key={seconds} size="lg" onClick={() => addTime(seconds)}>
                +{seconds}sec
              </Button>
            ))}
          </div>
          <div className="space-x-4">
            <Button size="lg" onClick={startStop}>
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
