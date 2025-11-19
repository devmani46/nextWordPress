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
  // Building the content displayed inside FlipText

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
      className="button-regular bg-blue-normal px-6 py-6 hover:bg-blue-normal-hover"
    >
      <FlipText
        className="flex gap-4"
        frontText={loading ? "Loading..." : content}
        backText={loading ? "Loading..." : content}
      />
    </Button>
  );
}
