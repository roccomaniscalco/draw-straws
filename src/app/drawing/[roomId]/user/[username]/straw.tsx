import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const strawVariants = cva("", {
  variants: {
    color: {
      red: "from-red-300 to-red-600",
      blue: "from-blue-300 to-blue-600",
      green: "from-green-300 to-green-600",
      yellow: "from-yellow-300 to-yellow-600",
      purple: "from-purple-300 to-purple-600",
      orange: "from-orange-300 to-orange-600",
    },
  },
});

interface StrawProps extends VariantProps<typeof strawVariants> {}
export function Straw(props: StrawProps) {
  return (
    <div
      className={cn(
        "relative flex h-64 w-8 justify-around bg-gradient-to-r",
        strawVariants({ color: props.color }),
      )}
    >
      <div
        className={cn(
          "absolute inset-0 flex h-2 w-8 -translate-y-1 transform justify-between overflow-clip rounded-[50%] bg-gradient-to-l",
          strawVariants({ color: props.color }),
        )}
      />
      <div className="h-64 w-[2px] bg-gradient-to-r from-slate-50/90 to-stone-100/90"></div>
      <div className="h-64 w-[2px] bg-gradient-to-r from-slate-100/90 to-stone-200/90"></div>
      <div className="h-64 w-[2px] bg-gradient-to-r from-slate-200/90 to-stone-300/90"></div>
    </div>
  );
}
