import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { List, Row, Col, Button, Pagination, message } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { fetchItemList, fetchFileInfo, downloadFilteredFile } from '../api/logFileApi';
import TypeIdFilter from '../components/TypeIdFilter';
import TimeInput from '../components/TimeInput';

const LogItemsPage: React.FC = () => {
  const { filename } = useParams<{ filename: string }>();
  const [logItems, setLogItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [typeIds, setTypeIds] = useState<string[]>([]);
  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [time, setTime] = useState({
    start: { hour: '00', minute: '00', second: '00' },
    end: { hour: '23', minute: '59', second: '59' }
  });
  const navigate = useNavigate();

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return '';
    const date = timestamp.slice(0, 10);
    const time = timestamp.slice(11, 19).replace(/-/g, ':');
    return `${date} ${time}`;
  };

  const formatTimeInput = ({ hour, minute, second }: { hour: string, minute: string, second: string }) => {
    return `${hour.padStart(2, '0')}-${minute.padStart(2, '0')}-${second.padStart(2, '0')}-000000`;
  };

  const loadFileInfo = useCallback(async () => {
    const fileInfo = await fetchFileInfo(filename!);
    setStartTime(fileInfo.start);
    setEndTime(fileInfo.end);
    setTypeIds(fileInfo.type_ids);
    setSelectedTypeIds(fileInfo.type_ids); // 默认全选
    setTime({
      start: { hour: '00', minute: '00', second: '00' },
      end: { hour: '23', minute: '59', second: '59' }
    });
  }, [filename]);

  const loadItems = useCallback(async () => {
    const currentDate = startTime.split('-').slice(0, 3).join('-');
    const startFormatted = `${currentDate}-${formatTimeInput(time.start)}`;
    const endFormatted = `${currentDate}-${formatTimeInput(time.end)}`;
    const data = await fetchItemList(filename!, page, 20, startFormatted, endFormatted, selectedTypeIds);
    setLogItems(data.data);
    setTotalPages(data.pages);
    setTotalItems(data.total);
  }, [filename, page, startTime, time, selectedTypeIds]);

  useEffect(() => {
    loadFileInfo();
  }, [loadFileInfo]);

  useEffect(() => {
    if (startTime && endTime && selectedTypeIds.length > 0) {
      loadItems();
    }
  }, [loadItems, startTime, endTime, selectedTypeIds, page]);

  const handleTypeIdChange = (checkedValues: CheckboxValueType[]) => {
    setSelectedTypeIds(checkedValues as string[]);
    setPage(1); // 重置页码为第一页
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleTimeChange = (field: 'start' | 'end', type: 'hour' | 'minute' | 'second', value: string) => {
    setTime(prevTime => ({
      ...prevTime,
      [field]: {
        ...prevTime[field],
        [type]: value || '00',
      },
    }));
    setPage(1); // 重置页码为第一页
  };

  const handleDownload = async () => {
    try {
      const data = await downloadFilteredFile(filename!, selectedTypeIds);
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename!;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      message.success('Download started');
    } catch (error) {
      message.error('Download failed');
    }
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
                <strong>Timestamp</strong>
                <div>Start Time: {formatTimestamp(startTime)}</div>
                <div>End Time: {formatTimestamp(endTime)}</div>
                <div>
                  Start Time: <TimeInput time={time.start} onChange={(type, value) => handleTimeChange('start', type, value)} />
                </div>
                <div>
                  End Time: <TimeInput time={time.end} onChange={(type, value) => handleTimeChange('end', type, value)} />
                </div>
              </Col>
              <Col span={11}>
                <strong>Type ID</strong>
                <TypeIdFilter
                  typeIds={typeIds}
                  selectedTypeIds={selectedTypeIds}
                  onChange={handleTypeIdChange}
                />
                <Button onClick={handleDownload} style={{ marginTop: '10px' }}>Download</Button>
              </Col>
            </Row>
          </div>
        }
        bordered
        dataSource={logItems}
        renderItem={(item, index) => {
          const parts = item.split(':');
          const timestamp = parts[2];
          const typeId = parts.slice(-1)[0];
          return (
            <List.Item>
              <Link to={`/item/${item}`} style={{ width: '100%' }}>
                <Row style={{ width: '100%' }}>
                  <Col span={2}>{index + 1 + (page - 1) * 20}</Col>
                  <Col span={11}>{timestamp}</Col>
                  <Col span={11}>{typeId}</Col>
                </Row>
              </Link>
            </List.Item>
          );
        }}
      />
      <Pagination
        current={page}
        total={totalItems}
        pageSize={20}
        onChange={handlePageChange}
        showQuickJumper
        showSizeChanger={false}  // 确保不显示每页条数选择框
      />
    </div>
  );
};

export default LogItemsPage;