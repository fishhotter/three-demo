export interface IProps {
    message?: (obj: InterMessageType) => void
}

export interface InterMessageType {
    className: string;
    type: string;
    content: string;
    duration: number;
}