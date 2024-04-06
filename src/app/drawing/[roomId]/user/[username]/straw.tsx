export function Straw() {
  return (
    <div className="to relative flex h-64 w-8 justify-around bg-red-600 bg-gradient-to-r from-red-300">
      <div className="absolute inset-0 flex h-4 w-8 -translate-y-2 transform justify-between overflow-clip rounded-[50%] bg-red-700 bg-gradient-to-l from-red-400" />
      <div className="h-64 w-[2px] bg-gradient-to-r from-slate-50 to-stone-100"></div>
      <div className="h-64 w-[2px] bg-gradient-to-r from-slate-100 to-stone-200"></div>
      <div className="h-64 w-[2px] bg-gradient-to-r from-slate-200 to-stone-300"></div>
    </div>
  );
}
