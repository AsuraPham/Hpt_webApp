import * as React from 'react';
import { Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnProps } from 'antd/lib/table';
import { PaginationState } from '../../../common/models/Pagination';
import * as actionCreators from '../NotificationAction';
import { dateFormat } from '../../../common/utils';
import NotificationDetailModal from './NotificationDetailComponent';
interface Props {
  notifications?: any[];
  pagination: PaginationState;
  handleTableChange?: any;
  onSearch?: any;
  isLoading?: boolean;
  actions: typeof actionCreators;
  notificationDetail: any;
  isOpenModal: boolean;
  rowClick?: any;
}
export default class NotificationListComponent extends React.Component<Props, any> {
  columns: ColumnProps<any>[] = [{
    title: 'Notification ID',
    dataIndex: 'notificationId',
    key: 'notificationId',
    sorter: true,
    defaultSortOrder: 'ascend',
    width: 150,
    onCell: (record) => this.onCell(record)
  },
  {
    title: 'Case',
    dataIndex: 'case',
    key: 'case',
    sorter: true,
    width: 150,
    onCell: (record) => this.onCell(record)
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
    sorter: true,
    width: 350,
    onCell: (record) => this.onCell(record)
  },
  {
    title: 'Date of sending',
    dataIndex: 'dateOfSending',
    key: 'dateOfSending',
    render: (text, record: any) => dateFormat(record.dateOfSending),
    sorter: true,
    width: 150,
    onCell: (record) => this.onCell(record)
  },

  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
    sorter: true,
    width: 150,
    onCell: (record) => this.onCell(record)
  },
  {
    title: '',
    className: 'text-center',
    width: 30,
    render: (text, record) => (
      <div key={text} className='dropleft'>
        <a id='dropdownMenuButton' data-toggle='dropdown' >
          <i className='fa fa-ellipsis-v'></i>
        </a>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <a className='dropdown-item' onClick={() => this.showModalDetail(record)}>Details</a>
        </div>
      </div>
    ),
  }
  ];

  constructor(props: any) {
    super(props);
  }
  showModalDetail = (record) => {
    this.props.actions.getNotificationDetail(record.id);
    this.props.actions.openCloseModel({ isOpenModal: true });
    return {
      onClick: () => this.props.rowClick(record)
    };
  }
  onCell = (record) => {
    return {
      onClick: () => this.showModalDetail(record)
    };
  }
  closeModal = (object) => {
    this.props.actions.openCloseModel(object);
  }
  render() {
    return (<div className='mb-30 col' >
      <div className='card-statistics h-100 card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-3 col-md-2'>
              <h5 className='mb-30'><b>Notification list</b></h5>
            </div>
            <div className='col-md-6'>
              <Search
                placeholder='Search...'
                className='txtSearch input-search'
                onSearch={this.props.onSearch}
              />
            </div>
          </div>
          <div className='row box-content'>
            <Table className='mb-30 col'
              columns={this.columns} dataSource={this.props.notifications}
              pagination={this.props.pagination}
              onChange={this.props.handleTableChange}
              rowKey='id'
            />
            <NotificationDetailModal
              isLoading={this.props.isLoading}
              actions={this.props.actions}
              isOpenModal={this.props.isOpenModal}
              closeModal={this.closeModal}
              notificationDetail={this.props.notificationDetail}>
            </NotificationDetailModal>
          </div>

        </div>
      </div>
    </div>);
  }
}