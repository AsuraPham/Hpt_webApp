import * as React from 'react';
import { Modal, Spin } from 'antd';
import { BE_WANT } from '../const/label';
interface Prop {
    isOpenModalDelete: boolean;
    closeModal?: any;
    isLoading?: boolean;
    delete: any;
    message: any;
}
export const DeleteModalComponent = (props: Prop) => {

    const closeModal = () => {
        props.closeModal({ isOpenModalDelete: false });
    };
    return (
        <Modal
            okText='Delete'
            className='modal-del'
            onCancel={closeModal}
            style={{ top: 166 }}
            visible={props.isOpenModalDelete}
            onOk={props.delete}
            bodyStyle={{ textAlign: 'center', paddingTop: 54 }}
            closable={false}
            destroyOnClose={true}
        >
            <Spin size='large' spinning={props.isLoading}>
                <h5 className='txt-title' >{props.message}</h5>
                <h5 className='txt-title'>{BE_WANT}</h5>
            </Spin>
        </Modal>
    );
};
export default DeleteModalComponent;
