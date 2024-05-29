import React, { useEffect, useState } from 'react';
import { List, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { fetchFileList } from '../api/logFileApi';

export const FileListPage: React.FC = () => {
    const [fileList, setFileList] = useState<string[]>([]);

    useEffect(() => {
        const getResult = async () => {
            const result = await fetchFileList();
            setFileList(result);
        };
        getResult();
    }, []);

    return (
        <List
            header={
                <div>
                  <Row style={{ width: '100%' }}>
                    <Col span={2}><strong> File Name </strong></Col>
                  </Row>
                </div>
            }
            bordered={true}
            dataSource={fileList}
            renderItem={item => (
                <List.Item>
                    <Link to={`/log/${item}`}>{item}</Link>
                </List.Item>
            )} />
    );
};
