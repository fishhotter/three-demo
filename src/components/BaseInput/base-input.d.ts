export interface IProps {
    type?: "text" | "password" | "checkbox",
    label?: string,
    name?: string,
    value?: string | boolean,
    placeholder?: string,
    children?: JSX.Element,
    iconClassName?: string,
    userClass?: string,
    onChange?: (name: string | undefined, value: string | boolean | undefined) => void,
} 