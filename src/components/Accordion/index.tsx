import React, {
    useState,
    useRef,
    ReactNode,
    useEffect,
    ComponentProps,
} from "react";
import Chevron from "./Chevron.svg";
import clsx from "clsx";
import "./Accordion.scss";

type AccordionVariants = "underline" | "bordered" | "shadow";

type AccordionProps = Omit<ComponentProps<"div">, "title"> & {
    children: ReactNode;
    defaultOpen?: boolean;
    isCompact?: boolean;
    title: string | JSX.Element;
    variant?: AccordionVariants;
    headerClassName?: string;
};

const AccordionVariant = {
    bordered: "deriv-accordion--bordered",
    shadow: "deriv-accordion--shadow",
    underline: "deriv-accordion--underline",
} as const;

export const Accordion = ({
    defaultOpen = false,
    children,
    isCompact = false,
    title,
    variant = "underline",
    className,
    headerClassName,
    ...props
}: AccordionProps) => {
    const [active, setActive] = useState(defaultOpen);
    const [setHeight, setHeightState] = useState(defaultOpen ? "auto" : "0px");

    const content = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scrollHeight = content?.current?.scrollHeight;
        setHeightState(active ? `${scrollHeight}px` : "0px");
    }, [active]);

    const toggleAccordion = () => setActive(!active);

    return (
        <div
            className={clsx(
                "deriv-accordion",
                AccordionVariant[variant],
                {
                    "deriv-accordion--compact": isCompact,
                },
                className,
            )}
            {...props}
        >
            <button
                className={clsx(
                    "deriv-accordion__header",
                    {
                        "deriv-accordion__header--active": active,
                    },
                    headerClassName,
                )}
                onClick={toggleAccordion}
                aria-expanded={active}
                type="button"
            >
                {typeof title === "string" ? <p>{title}</p> : title}
                <img
                    src={Chevron}
                    className={clsx("deriv-accordion__icon", {
                        "deriv-accordion__icon--active": active,
                    })}
                />
            </button>
            <div
                ref={content}
                style={{ maxHeight: setHeight }}
                className={clsx("deriv-accordion__content", {
                    "deriv-accordion__content--active": active,
                })}
            >
                <div
                    className={clsx("deriv-accordion__text", {
                        "deriv-accordion__text--compact": isCompact,
                    })}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
