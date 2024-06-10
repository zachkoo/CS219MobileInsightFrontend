import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, message, Upload,Pagination } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchFileList, uploadFile } from '../api/logFileApi';

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

  const handleUpload = async (file: File) => {
    try {
      const response = await uploadFile(file);
      // message.success(`File uploaded successfully: ${response}`);
      message.success(`File uploaded successfully`);
      // Optionally reload the file list after upload
      const data = await fetchFileList(page, 20);
      setFiles(data.data);
      setTotalPages(data.pages);
      setTotalItems(data.total);
    } catch (error) {
      message.error('File upload failed');
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      handleUpload(file);
      return false; // Prevent automatic upload by antd
    },
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>Log Files</h1>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
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