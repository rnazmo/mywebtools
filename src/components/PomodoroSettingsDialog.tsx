import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { PomodoroSettings } from "@/hooks/usePomodoroSettings";

type Props = {
  settings: PomodoroSettings;
  // 設定を保存したとき、タイマーをリセットする必要があるため親に通知する
  onSave: () => void;
};

export default function PomodoroSettingsDialog({ settings, onSave }: Props) {
  const [open, setOpen] = useState(false);

  // モーダル内の入力値はローカルなdraftとして管理する。
  // 「保存」を押すまで実際の設定に反映しないことで、
  // キャンセル時に変更を破棄できる
  const [draftFocus, setDraftFocus] = useState(settings.focusSeconds / 60);
  const [draftBreak, setDraftBreak] = useState(settings.breakSeconds / 60);

  const handleOpenChange = (nextOpen: boolean) => {
    // モーダルを開くたびに現在の設定値でdraftを初期化する。
    // こうしないと前回の未保存入力が残ったままになる
    if (nextOpen) {
      setDraftFocus(settings.focusSeconds / 60);
      setDraftBreak(settings.breakSeconds / 60);
    }
    setOpen(nextOpen);
  };

  const handleSave = () => {
    settings.setFocusMinutes(draftFocus);
    settings.setBreakMinutes(draftBreak);
    onSave();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="設定を開く">
          ⚙
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ポモドーロタイマー設定</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel>集中時間（分）</FieldLabel>
            <Input
              type="number"
              min={1}
              max={60}
              value={draftFocus}
              onChange={(e) => setDraftFocus(Number(e.target.value))}
              className="w-24"
            />
          </Field>
          <Field>
            <FieldLabel>休憩時間（分）</FieldLabel>
            <Input
              type="number"
              min={1}
              max={60}
              value={draftBreak}
              onChange={(e) => setDraftBreak(Number(e.target.value))}
              className="w-24"
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
