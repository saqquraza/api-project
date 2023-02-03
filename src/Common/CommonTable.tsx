import React from 'react';
import { Table } from 'antd';

interface CommonTableProps {
    columns: any[];
    data: any[];
    rowSelection?: any;
    rowKey?: string;
    scroll?: any;
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, scroll, ...props }) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={scroll}
            size="small"
            pagination={{ position: ['bottomCenter'] }}
            {...props}
        />
    )
}

export default CommonTable