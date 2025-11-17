import { Button, ButtonProps } from "./button";
import { FlipText } from "./flippingtext";

type WhiteButtonProps = ButtonProps & {
  loading?: boolean;
};

export default function WhiteButton({
  loading,
  children,
  ...props
}: WhiteButtonProps) {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      className="bg-white-light p-5 text-primary hover:bg-white-normal-hover"
    >
      <FlipText
        frontText={loading ? "Loading..." : children}
        backText={loading ? "Loading..." : children}
      />
    </Button>
  );
}
