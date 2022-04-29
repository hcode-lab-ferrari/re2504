import { ReactNode, useEffect, useState } from "react";

type ToastProps = {
    children: ReactNode;
    type?: 'success' | 'danger';
    open?: boolean;
    onClose?: Function;
}

const Toast: React.FC<ToastProps> = ({
    children,
    type = "success",
    open = true,
    onClose,
}) => {

    const [opened, setOpened] = useState(open);

    const close = () => {

        if (typeof onClose === 'function') {
            onClose();
        }

        setOpened(false);

    }

    useEffect(() => setOpened(open), [open]);

    return (
        <div className={["toast", type, opened ? 'open' : ''].join(' ')}>
            {children}
            <button type="button" className="close" onClick={() => close()}>
                <span>&times;</span>
            </button>
        </div>
    )

}

export default Toast;