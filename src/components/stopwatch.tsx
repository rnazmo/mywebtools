import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Stopwatch() {
  const [elapsedMilliSeconds, setElapsedMilliSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // isRunning が false のときはインターバルを設定せず即返す
    if (!isRunning) return;

    // 10ms ごとに加算。関数形式の setState を使うことで、
    // 古い値を参照してしまう「クロージャの罠」を避けられる
    const intervalId = setInterval(
      () => setElapsedMilliSeconds((t) => t + 10),
      10,
    );
    return () => clearInterval(intervalId);
  }, [isRunning]); // isRunning だけを依存にする（時刻を依存に入れると10msごとにインターバルが再生成され無駄が大きい）

  const startPause = () => setIsRunning((r) => !r);

  const reset = () => {
    setIsRunning(false);
    setElapsedMilliSeconds(0);
  };

  const padWithZero = (num: number, length = 2) =>
    num.toString().padStart(length, "0");

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3_600_000);
    const minutes = Math.floor((ms % 3_600_000) / 60_000);
    const seconds = Math.floor((ms % 60_000) / 1_000);
    const centiseconds = Math.floor((ms % 1_000) / 10); // 100分の1秒（2桁）
    return {
      hours: padWithZero(hours),
      minutes: padWithZero(minutes),
      seconds: padWithZero(seconds),
      centiseconds: padWithZero(centiseconds),
    };
  };

  const { hours, minutes, seconds, centiseconds } =
    formatTime(elapsedMilliSeconds);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Stopwatch</h1>
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <div className="text-6xl font-mono mb-6">
            {hours}:{minutes}:{seconds}.
            <span className="text-4xl">{centiseconds}</span>
          </div>
          <div className="space-x-4">
            <Button onClick={startPause}>
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={reset}>Reset</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
