import { Straw } from "@/app/drawing/[roomId]/user/[username]/straw";

export default function DrawingPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl">Welcome to DrawingPage!</h1>
      <div className="container fixed bottom-0 flex w-full transform justify-between">
        <Straw />
        <Straw />
        <Straw />
        <Straw />
        <Straw />
      </div>
    </div>
  );
}
