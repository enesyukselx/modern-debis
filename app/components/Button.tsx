import { cn } from "../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, ...props }: ButtonProps) => {
    return (
        <button
            className={cn(
                "bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500",
                className
            )}
            {...props}
        >
            {props.title}
        </button>
    );
};

export default Button;
