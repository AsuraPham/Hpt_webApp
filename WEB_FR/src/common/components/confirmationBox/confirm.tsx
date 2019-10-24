import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ConfirmationBox, { ConfirmationBoxProps } from './ConfirmationBox';

export default function confirm(boxConfig: any) {
    let config: ConfirmationBoxProps;
    config = {
        title: boxConfig.title,
        content: boxConfig.content,
        onConfirm: confirmAction,
        onCancel: cancelAction
    };

    let div = document.createElement('div');
    document.body.appendChild(div);

    function confirmAction() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        if (boxConfig.onConfirm) {
            boxConfig.onConfirm();
        }
    }

    function cancelAction(actionFn: () => void) {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        if (boxConfig.onCancel) {
            boxConfig.onCancel();
        }
    }

    function render(props: ConfirmationBoxProps) {
        ReactDOM.render(<ConfirmationBox {...props} />, div);
    }

    render({...config});
}