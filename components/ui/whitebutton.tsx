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
        "bg-white-light p-5 text-gray hover:bg-white-normal-hover",
        className,
      )}
    >
      <FlipText
        frontText={loading ? "Loading..." : content}
        backText={loading ? "Loading..." : content}
      />
    </Button>
  );
}
