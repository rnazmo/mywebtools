import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// フォーカス時間と休憩時間の設定（秒単位）
// 定数として外に出すことで、後から値を変えやすくする
const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

// ビープ音を鳴らす関数
// Web Audio API でコードから音を生成するため、音声ファイルは不要。
// audioContext は呼び出しのたびに new することも可能だが、
// ブラウザのオートプレイポリシーにより「ユーザー操作なしの音声再生」が制限されるため、
// モジュールスコープで1つ持ち、最初のユーザー操作時に resume する設計にしている。
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// 単音を鳴らす。frequency: 周波数(Hz)、startTime: 開始時刻(秒)、duration: 長さ(秒)
const playTone = (
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
): void => {
  // OscillatorNode: 指定した周波数のサイン波を生成する「音源」
  const oscillator = ctx.createOscillator();
  // GainNode: 音量を調整する「ボリュームつまみ」。0〜1の範囲で指定する
  const gain = ctx.createGain();

  // 音源 → ボリューム → スピーカーの順につなぐ
  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.type = "sine"; // サイン波: 最も柔らかい波形
  oscillator.frequency.value = frequency;
  gain.gain.value = 0.3; // 音量: 耳障りにならない程度の小ささ

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

// フェーズ切り替え時の通知音を鳴らす
// toFocusTime: true なら休憩→集中（3回）、false なら集中→休憩（2回）
const playBeep = (toFocusTime: boolean): void => {
  const ctx = getAudioContext();
  // ブラウザのオートプレイポリシーで suspended になっている場合に再開する
  // （ユーザー操作後に呼ばれる前提だが、念のため毎回チェックする）
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const toneDuration = 0.15; // 1音の長さ（秒）
  const toneInterval = 0.2; // 音の間隔（秒）

  if (toFocusTime) {
    // 休憩→集中: 「さあ始めよう」= 低め3回
    playTone(ctx, 440, now, toneDuration); // A4
    playTone(ctx, 440, now + toneInterval, toneDuration);
    playTone(ctx, 440, now + toneInterval * 2, toneDuration);
  } else {
    // 集中→休憩: 「お疲れさま」= 高め2回
    playTone(ctx, 660, now, toneDuration); // E5
    playTone(ctx, 660, now + toneInterval, toneDuration);
  }
};

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
    playBeep(nextIsFocusTime);
  }, [remainingSeconds, isFocusTime]);

  // 現在のフェーズを終わらせて次のフェーズへ手動で進む
  // 自動開始はしない（ユーザーが準備できたタイミングで Start するため）
  // また、skip 関数の中身はフェーズ切り替え useEffect と似ているが、気軽に DRY しないこと。
  // useEffect は「タイマーが自然にゼロになったとき」の自動処理で、
  // skip は「ユーザーが手動で進めるとき」の処理で、目的が異なるため。
  // 今後「スキップ時はカウントを記録する」「自動進行時は音を鳴らす」といった差異が生まれたとき、
  // 別々に書いてあることが生きてくる。
  const skip = () => {
    setIsRunning(false);
    const nextIsFocusTime = !isFocusTime;
    setIsFocusTime(nextIsFocusTime);
    setRemainingSeconds(nextIsFocusTime ? FOCUS_SECONDS : BREAK_SECONDS);
    playBeep(nextIsFocusTime);
  };

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

  // タブタイトルに残り時間を表示する
  // 最小化中・別タブ作業中でも残り時間を確認できるようにするため。
  // アンマウント時（他ページ移動時）にはタイトルを元に戻す
  useEffect(() => {
    document.title = `[${formatTime(remainingSeconds)}] Pomodoro Timer`;
    return () => {
      document.title = "mywebtools";
    };
  }, [remainingSeconds]);

  // フェーズに応じた背景色クラスを決定する
  // Tailwind はビルド時にソースをスキャンしてクラスを収集するため、
  // 文字列を動的に組み立てると検出されずスタイルが当たらない。
  // クラス名全体を静的な文字列リテラルとして書くことで、この問題を回避する。
  const bgClass = isFocusTime
    ? "bg-blue-100 dark:bg-blue-900"
    : "bg-green-100 dark:bg-green-900";

  return (
    // min-h-screen でビューポート全体を覆い、-m-6 で Layout の <main> の padding (p-6) を打ち消す。
    // p-6 で内側の余白を元に戻す。こうすることで背景色をページ幅いっぱいに広げられる。
    <div
      className={`min-h-screen -m-6 p-6 transition-colors duration-700 ${bgClass}`}
    >
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
            <Button size="lg" className="min-w-[4.5rem]" onClick={startPause}>
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button
              size="lg"
              className="min-w-[4.5rem]"
              variant="outline"
              onClick={skip}
            >
              Skip →
            </Button>
            <Button size="lg" className="min-w-[4.5rem]" onClick={reset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
