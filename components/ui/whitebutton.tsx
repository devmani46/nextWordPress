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
      className="bg-white-light text-primary p-5 "
    >
      {loading ? "Loading..." : children}
    </Button>
  );
}
