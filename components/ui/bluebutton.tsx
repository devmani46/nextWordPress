import { Button, ButtonProps } from "./button";
import { FlipText } from "./flippingtext";

type BlueButtonProps = ButtonProps & {
  loading?: boolean;
};

export default function BlueButton({
  loading,
  children,
  ...props
}: BlueButtonProps) {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      className="button-regular bg-blue-normal px-6 py-6 hover:bg-blue-normal-hover"
    >
      <FlipText
        frontText={loading ? "Loading..." : children}
        backText={loading ? "Loading..." : children}
      />
    </Button>
  );
}
