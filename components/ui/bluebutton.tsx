import { Button, ButtonProps } from "./button";

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
      className="bg-blue-normal px-6 py-6 button-regular"
    >
      {loading ? "Loading..." : children}
    </Button>
  );
}
