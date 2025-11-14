import { Button, ButtonProps } from "./button";

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
      {loading ? "Loading..." : children}
    </Button>
  );
}
