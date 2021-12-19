import React, { useEffect } from 'react';
import ReactDom from 'react-dom';

type ModalDialogProps = {
    header?: string;
    rootClass?: string;
    submitText?: string;
    cancelText?: string;
    onSubmit?: () => void;
    onCancel?: () => void;
};

const ModalDialog: React.FC<ModalDialogProps> = ({
    header,
    rootClass,
    submitText,
    cancelText,
    onSubmit,
    onCancel,
    children
}) => {
    const domRoot = document.getElementById('portal');
    const modalRoot = document.createElement('div');
    domRoot && domRoot.appendChild(modalRoot);

    useEffect(() => {
        return () => {
            domRoot && domRoot.removeChild(modalRoot);
        };
    }, []);

    const modal = () => {
        return (
            <div className="lnc-modal-shadow">
                <div className={[rootClass, 'ln-modal-dialog'].join(' ')}>
                    <div className="lnp-header">{header || ''}</div>
                    <div className="lnp-main">{children}</div>
                    <div className="lnp-footer">
                        <button onClick={onCancel}>
                            <span>{cancelText || 'Cancel'}</span>
                        </button>
                        <button onClick={onSubmit} className="lnt-primary">
                            <span>{submitText || 'Submit'}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return ReactDom.createPortal(modal(), domRoot!);
};

export default ModalDialog;
