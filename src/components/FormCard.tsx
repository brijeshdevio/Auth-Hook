import type { ReactNode } from "react";

const Header = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`text-center ${className}`}>{children}</div>;
};

const Body = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`${className}`}>{children}</div>;
};

const Footer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`text-center ${className}`}>{children}</div>;
};

const FormCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="card bg-base-300 w-100 shadow-sm">
      <div className="card-body flex flex-col gap-4">{children}</div>
    </div>
  );
};

FormCard.Header = Header;
FormCard.Body = Body;
FormCard.Footer = Footer;

export default FormCard;
