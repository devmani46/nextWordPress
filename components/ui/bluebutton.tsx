import { Button, ButtonProps } from "./button";
import { FlipText } from "./flippingtext";

type BlueButtonProps = ButtonProps & {
  loading?: boolean;
  icon?: boolean;
};

export default function BlueButton({
  loading,
  icon,
  children,
  ...props
}: BlueButtonProps) {
  const content = (
    <span className="flex items-center gap-1 hover:text-blue-normal">
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
      className="button-regular group relative overflow-hidden rounded-lg bg-blue-normal px-6 py-6 transition-all duration-500 ease-in-out will-change-auto hover:scale-105 hover:border hover:border-blue-normal hover:bg-blue-normal-hover hover:text-blue-normal"
    >
      {/* EXPANDING ARC HOVER EFFECT */}
      <span className="ease-[cubic-] absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white transition-all duration-500 hover:rounded-xl group-hover:translate-y-20"></span>

      <span className="relative z-50 hover:text-blue-normal">{content}</span>
    </Button>
  );
}
