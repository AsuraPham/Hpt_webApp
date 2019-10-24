import * as React from 'react';
import { Modal, Spin } from 'antd';
import { GOOGLE_DOC_VIEWER_URL, GOOGLE_DOC_VIEWER_MODE } from '../../const/device-const';
import './fileViewer.css';

interface Props {
    fileUrl: string;
    fileName: string;
    visible?: boolean;
    onCancel?: any;
}

interface LoadingStates {
    loading: boolean;
}

export default class FileViewer extends React.Component<Props, LoadingStates> {
    src = `${GOOGLE_DOC_VIEWER_URL}${this.props.fileUrl}${GOOGLE_DOC_VIEWER_MODE}`;

    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
        };
        this.onLoad = this.onLoad.bind(this);
        this.download = this.download.bind(this);
    }

    onLoad() {
        this.setState({ loading: false });
    }

    download() {
        let link = document.createElement('a');
        link.href = this.props.fileUrl;
        link.download = this.props.fileName;
        link.dispatchEvent(new MouseEvent('click'));
    }

    render() {
        return (
            <Modal visible={this.props.visible} onCancel={this.props.onCancel} className='file-viewer'>
                <Spin spinning={this.state.loading} size='large'></Spin>
                {this.props.fileUrl &&
                    <div className='file-content'>
                        <div className='file-info'><i className='fa fa-file' /><span>{this.props.fileName}</span></div>
                        <button type='button' className='btn-download' onClick={this.download} title='Download'>
                            <span aria-hidden='true'><i className='fa fa-download' /></span>
                        </button>
                        <button type='button' className='btn-cancel' onClick={this.props.onCancel} title='Cancel'>
                            <span aria-hidden='true'>Cancel</span>
                        </button>
                        <iframe onLoad={this.onLoad} src={this.src} ></iframe>
                    </div>}
            </Modal>
        );
    }
}
