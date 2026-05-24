import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UUIDV4() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUUIDs = () => {
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      const uuid = crypto.randomUUID();
      results.push(uuid);
    }
    setUuids(results);
  };
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">UUID v4 Generator</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          {/* 入力エリア */}
          <div className="flex gap-2">
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-18"
            />
            <Button onClick={generateUUIDs}>Generate!</Button>
          </div>

          {/* 結果一覧 */}
          <ul className="space-y-2">
            {uuids.map((uuid) => (
              <li key={uuid} className="rounded-md border p-2 bg-muted">
                <code className="">{uuid}</code>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
