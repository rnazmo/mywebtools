import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ツールを追加するときはここにも追記する
const TOOLS = [
  { name: "Stopwatch", path: "/stopwatch" },
  { name: "Timer", path: "/timer" },
  { name: "Pomodoro Timer", path: "/pomodoro" },
  { name: "UUID v4 Generator", path: "/uuid-v4" },
  { name: "Random String Generator", path: "/random-string" },
];

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">mywebtools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <Card key={tool.path}>
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to={tool.path} className="text-blue-500 hover:underline">
                使ってみる →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
