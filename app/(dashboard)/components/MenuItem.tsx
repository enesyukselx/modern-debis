"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/app/utils/cn";

type MenuItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const MenuItem = ({ className, ...props }: MenuItemProps) => {
    let pathname = usePathname();

    if (pathname.split("/").length > 3) {
        pathname = pathname.split("/").slice(0, 3).join("/");
    }

    return (
        <li>
            <Link
                className={cn(
                    "py-3 px-2 mb-2 bg-slate-300 hover:bg-slate-200 text-black font-bold text-sm w-full block rounded",
                    className,
                    {
                        "bg-gray-900 hover:bg-gray-900 text-white":
                            pathname === props.href,
                    }
                )}
                href={props.href!}
            >
                {props.title}
            </Link>
        </li>
    );
};

export default MenuItem;
