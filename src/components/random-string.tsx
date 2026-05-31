import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

const composeMaterial = (
  useLowercase: boolean,
  useUppercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
): string => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!#$%&()*+,-./:;<=>?@[]^_`{|}~";
  let materialString = "";
  if (useLowercase) {
    materialString += lowercase;
  }
  if (useUppercase) {
    materialString += uppercase;
  }
  if (useNumbers) {
    materialString += numbers;
  }
  if (useSymbols) {
    materialString += symbols;
  }
  return materialString;
};

// 0 <= n <= max の範囲のランダムな整数を返す
const getRandomInt = (max: number): number => {
  // TODO: Math.raandom() は十分にランダムではないため、
  // crypto.getRandomValues() などの方法を検討する
  return Math.floor(Math.random() * (max + 1));
};

const generateRandomString = (materials: string, length: number): string => {
  // TODO: Validate length if needed

  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += materials[getRandomInt(materials.length - 1)];
  }
  return randomString;
};

export default function RandomString() {
  const [count, setCount] = useState(5);
  const [length, setLength] = useState(12);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [randomStrings, setRandomStrings] = useState<string[]>([]);

  // TODO: useLowercase, useUppercase, useNumbers, useSymbols が全て false の場合のエラー処理
  // （生成ボタンを押せないようにするのが良さそう）

  const generateRandomStrings = () => {
    const materials = composeMaterial(
      useLowercase,
      useUppercase,
      useNumbers,
      useSymbols,
    );
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      const str = generateRandomString(materials, length);
      results.push(str);
    }
    setRandomStrings(results);
  };
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Random String Generator</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          {/* 入力エリア */}
          <div className="flex gap-2">
            <FieldGroup className="max-w-sm">
              <Field>
                <FieldLabel htmlFor="fieldgroup-name">Count</FieldLabel>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-18"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="fieldgroup-name">Length</FieldLabel>
                <Input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-18"
                />
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  checked={useLowercase}
                  onCheckedChange={(checked) => setUseLowercase(!!checked)}
                />
                <FieldLabel htmlFor="terms-checkbox">lower case</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  checked={useUppercase}
                  onCheckedChange={(checked) => setUseUppercase(!!checked)}
                />
                <FieldLabel htmlFor="terms-checkbox">upper case</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  checked={useNumbers}
                  onCheckedChange={(checked) => setUseNumbers(!!checked)}
                />
                <FieldLabel htmlFor="terms-checkbox">numbers</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  checked={useSymbols}
                  onCheckedChange={(checked) => setUseSymbols(!!checked)}
                />
                <FieldLabel htmlFor="terms-checkbox">symbols</FieldLabel>
              </Field>
              <Button onClick={generateRandomStrings}>Generate!</Button>
            </FieldGroup>
          </div>

          {/* 結果一覧 */}
          <ul className="space-y-2">
            {randomStrings.map((str, index) => (
              <li key={index} className="rounded-md border p-2 bg-muted">
                <code className="">{str}</code>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
