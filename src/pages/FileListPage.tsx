// import React, { useEffect, useState } from 'react';
// import { List, Row, Col } from 'antd';
// import { Link } from 'react-router-dom';
// import { fetchFileList } from '../api/logFileApi';

// export const FileListPage: React.FC = () => {
//     const [fileList, setFileList] = useState<string[]>([]);

//     useEffect(() => {
//         const getResult = async () => {
//             const result = await fetchFileList();
//             setFileList(result);
//         };
//         getResult();
//     }, []);

//     return (
//         <List
//             header={
//                 <div>
//                   <Row style={{ width: '100%' }}>
//                     <Col span={2}><strong> File Name </strong></Col>
//                   </Row>
//                 </div>
//             }
//             bordered={true}
//             dataSource={fileList}
//             renderItem={item => (
//                 <List.Item>
//                     <Link to={`/log/${item}`}>{item}</Link>
//                 </List.Item>
//             )} />
//     );
// };


import React, { useEffect, useState } from 'react';
import { List, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fetchFileList } from '../api/logFileApi';

const FileListPage: React.FC = () => {
  const [fileList, setFileList] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const getResult = async () => {
      const result = await fetchFileList();
      setFileList(result);
    };
    getResult();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('logfile', selectedFile);

    try {
      await axios.post('http://18.218.252.112:8080/upload_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully!');
      // Refresh the file list after upload
      const result = await fetchFileList();
      setFileList(result);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <div>
      <h1>File List Page</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
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
        )}
      />
    </div>
  );
};

export default FileListPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { List, Row, Col, Button } from 'antd';
// import { Link } from 'react-router-dom';

// const FileListPage: React.FC = () => {
//   const [fileList, setFileList] = useState<string[]>([]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   useEffect(() => {
//     // Function to fetch the list of files from the server
//     const fetchFiles = async () => {
//       try {
//         const response = await axios.get('http://18.218.252.112:8080/files'); // Update this endpoint as needed
//         setFileList(response.data);
//       } catch (error) {
//         console.error('Error fetching files:', error);
//       }
//     };

//     fetchFiles();
//   }, []);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert('Please select a file first!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('logfile', selectedFile);

//     try {
//       await axios.post('http://18.218.252.112:8080/upload_file', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert('File uploaded successfully!');
//       // Refresh the file list after upload
//       const response = await axios.get('http://18.218.252.112:8080/files');
//       setFileList(response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Failed to upload file. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>File List Page</h1>
//       <input type="file" onChange={handleFileChange} />
//       <Button onClick={handleUpload}>Upload File</Button>
//       <List
//         header={
//           <div>
//             <Row style={{ width: '100%' }}>
//               <Col span={24}><strong>File Name</strong></Col>
//             </Row>
//           </div>
//         }
//         bordered
//         dataSource={fileList}
//         renderItem={item => (
//           <List.Item>
//             <Link to={`/items/${item}`}>{item}</Link>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default FileListPage;

