import React, { useEffect, useState } from 'react';
import { List, Row, Col } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchItemList, queryItemByTime, queryItemByTypeID } from '../api/logFileApi';
import TimestampFilter from '../components/TimestampFilter';
import TypeIdFilter from '../components/TypeIdFilter';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const LogItemsPage: React.FC = () => {
  const { filename } = useParams<{ filename: string }>();
  const [itemList, setItemList] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [timestampVisible, setTimestampVisible] = useState(false);
  const [typeIdVisible, setTypeIdVisible] = useState(false);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [typeId, setTypeId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      if (filename !== undefined) {
        const result = await fetchItemList(filename);
        setItemList(result);
        setFilteredList(result);
      }
    };
    getResult();
  }, [filename]);

  const handleSearch = async () => {
    let result = itemList;
    if (filename && startTime && endTime) {
      const timeResult = await queryItemByTime(filename, startTime, endTime);
      result = result.filter(item => timeResult.includes(item));
    }
    if (filename && typeId) {
      const typeIdResult = await queryItemByTypeID(filename, typeId);
      result = result.filter(item => typeIdResult.includes(item));
    }
    setFilteredList(result);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
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
    </div>
  );
};

export default LogItemsPage;