import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, Pagination } from 'antd';
import { fetchFileList } from '../api/logFileApi';

export const FileListPage: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const loadFiles = async () => {
      const data = await fetchFileList(page, 20);
      setFiles(data.data);
      setTotalPages(data.pages);
      setTotalItems(data.total);
    };

    loadFiles();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>Log Files</h1>
      <List
        bordered
        dataSource={files}
        renderItem={(file) => (
          <List.Item>
            <Link to={`/log/${file}`}>{file}</Link>
          </List.Item>
        )}
      />
      <Pagination
        current={page}
        total={totalItems}
        pageSize={20}
        onChange={handlePageChange}
        showQuickJumper
      />
    </div>
  );
};