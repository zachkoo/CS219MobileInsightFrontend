// src/pages/ItemListPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { List, Row, Col, Button, InputNumber } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import TimestampFilter from '../components/TimestampFilter';
import TypeIdFilter from '../components/TypeIdFilter';
import { fetchItemList } from '../api/logFileApi';

const LogItemsPage: React.FC = () => {
  const { filename } = useParams<{ filename: string }>();
  const [itemList, setItemList] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [timestampVisible, setTimestampVisible] = useState(false);
  const [typeIdVisible, setTypeIdVisible] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [typeId, setTypeId] = useState('');
  const [inputPage, setInputPage] = useState<number | null>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getResponse = async () => {
      const response = await fetchItemList(filename!, page, 20);
      setItemList(response.data);
      setFilteredList(response.data); // 如果需要默认显示全部，可以这么做
      setPage(response.page);
      setInputPage(response.page); // 更新输入框的页数
      setTotalPages(response.pages);
    };
    getResponse();
  }, [filename, page]);

  const handlePageChange = () => {
    if (inputPage !== null) {
      setPage(inputPage);
    }
  };

  const handleSearch = () => {
    let filtered = itemList;

    if (startTime && endTime) {
      filtered = filtered.filter(item => {
        const timestamp = item.split(':')[2];
        return timestamp >= startTime && timestamp <= endTime;
      });
    }

    if (typeId) {
      filtered = filtered.filter(item => item.includes(typeId));
    }

    setFilteredList(filtered);
  };

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <List
        header={
          <div>
            <Row style={{ width: '100%' }}>
              <Col span={2}><strong> </strong></Col>
              <Col span={11}>
                <strong onClick={() => setTimestampVisible(!timestampVisible)}>
                  Timestamp {timestampVisible ? <UpOutlined /> : <DownOutlined />}
                </strong>
                {timestampVisible && (
                  <TimestampFilter
                    onSearch={(startTime, endTime) => {
                      setStartTime(startTime);
                      setEndTime(endTime);
                      handleSearch();
                    }}
                  />
                )}
              </Col>
              <Col span={11}>
                <strong onClick={() => setTypeIdVisible(!typeIdVisible)}>
                  Type ID {typeIdVisible ? <UpOutlined /> : <DownOutlined />}
                </strong>
                {typeIdVisible && (
                  <TypeIdFilter
                    onSearch={(typeId) => {
                      setTypeId(typeId);
                      handleSearch();
                    }}
                  />
                )}
              </Col>
            </Row>
          </div>
        }
        bordered
        dataSource={filteredList}
        renderItem={(item, index) => {
          const parts = item.split(':');
          const timestamp = parts[2];
          const typeId = parts.slice(3).join(':');
          return (
            <List.Item>
              <Link to={`/item/${item}`} style={{ width: '100%' }}>
                <Row style={{ width: '100%' }}>
                  <Col span={2}>{index + 1}</Col>
                  <Col span={11}>{timestamp}</Col>
                  <Col span={11}>{typeId}</Col>
                </Row>
              </Link>
            </List.Item>
          );
        }}
      />
      <div>
        <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</Button>
        <InputNumber
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(value) => setInputPage(value)}
          onPressEnter={handlePageChange}
          onBlur={handlePageChange}
        />
        / {totalPages}
        <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Next</Button>
      </div>
    </div>
  );
};

export default LogItemsPage;