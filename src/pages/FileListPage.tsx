import React, { useState, useEffect } from 'react';
import { List, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { fetchFileList } from '../api/logFileApi';

export const FileListPage: React.FC = () => {
  const [fileList, setFileList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState<number | null>(1);

  useEffect(() => {
    const getResponse = async () => {
      const response = await fetchFileList(page, 20);
      setFileList(response.data);
      setPage(response.page);
      setInputPage(response.page); // 更新输入框的页数
      setTotalPages(response.pages);
    };
    getResponse();
  }, [page]);

  const handlePageChange = () => {
    if (inputPage !== null) {
      setPage(inputPage);
    }
  };

  return (
    <div>
      <h1>Log Files</h1>
      <List
        bordered
        dataSource={fileList}
        renderItem={file => (
          <List.Item>
            <Link to={`/log/${file}`}>{file}</Link>
          </List.Item>
        )}
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
