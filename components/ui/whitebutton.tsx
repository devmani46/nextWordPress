import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";
import { FlipText } from "./flippingtext";

type WhiteButtonProps = ButtonProps & {
  loading?: boolean;
  icon?: boolean;
};

export default function WhiteButton({
  loading,
  icon,
  children,
  className,
  ...props
}: WhiteButtonProps) {
  const content = (
    <span className="flex items-center gap-1">
      {icon && (
        <span className="material-symbols-outlined text-amber-500">
          arrow_outward
        </span>
      )}
      {children}
    </span>
  );

  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        "group relative overflow-hidden bg-white-light py-5 pl-2 pr-3 text-gray transition-all duration-500 ease-in-out will-change-auto hover:scale-105 hover:bg-white-normal-hover",
        className,
      )}
    >
      <span className="ease-[cubic-] absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white-normal-hover transition-all duration-500 hover:rounded-xl group-hover:translate-y-20"></span>
      {/* <span className="relative z-50 hover:text-blue-normal">{content}</span> */}
      <FlipText
        frontText={loading ? "Loading..." : content}
        backText={loading ? "Loading..." : content}
      />
    </Button>
  );
}
