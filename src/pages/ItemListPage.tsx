// import React, { useEffect, useState } from 'react';
// import { List, Row, Col } from 'antd';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { fetchItemList, queryItemByTime, queryItemByTypeID } from '../api/logFileApi';
// import TimestampFilter from '../components/TimestampFilter';
// import TypeIdFilter from '../components/TypeIdFilter';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';

// const LogItemsPage: React.FC = () => {
//   const { filename } = useParams<{ filename: string }>();
//   const [itemList, setItemList] = useState<string[]>([]);
//   const [filteredList, setFilteredList] = useState<string[]>([]);
//   const [timestampVisible, setTimestampVisible] = useState(false);
//   const [typeIdVisible, setTypeIdVisible] = useState(false);
//   const [startTime, setStartTime] = useState<string>('');
//   const [endTime, setEndTime] = useState<string>('');
//   const [typeId, setTypeId] = useState<string>('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getResult = async () => {
//       if (filename !== undefined) {
//         const result = await fetchItemList(filename);
//         setItemList(result);
//         setFilteredList(result);
//       }
//     };
//     getResult();
//   }, [filename]);

//   const handleSearch = async () => {
//     let result = itemList;
//     if (filename && startTime && endTime) {
//       const timeResult = await queryItemByTime(filename, startTime, endTime);
//       result = result.filter(item => timeResult.includes(item));
//     }
//     if (filename && typeId) {
//       const typeIdResult = await queryItemByTypeID(filename, typeId);
//       result = result.filter(item => typeIdResult.includes(item));
//     }
//     setFilteredList(result);
//   };

//   return (
//     <div>
//       <button onClick={() => navigate(-1)}>Back</button>
//       <List
//         header={
//           <div>
//             <Row style={{ width: '100%' }}>
//               <Col span={2}><strong> </strong></Col>
//               <Col span={11}>
//                 <strong onClick={() => setTimestampVisible(!timestampVisible)}>
//                   Timestamp {timestampVisible ? <UpOutlined /> : <DownOutlined />}
//                 </strong>
//                 {timestampVisible && (
//                   <TimestampFilter
//                     onSearch={(startTime, endTime) => {
//                       setStartTime(startTime);
//                       setEndTime(endTime);
//                       handleSearch();
//                     }}
//                   />
//                 )}
//               </Col>
//               <Col span={11}>
//                 <strong onClick={() => setTypeIdVisible(!typeIdVisible)}>
//                   Type ID {typeIdVisible ? <UpOutlined /> : <DownOutlined />}
//                 </strong>
//                 {typeIdVisible && (
//                   <TypeIdFilter
//                     onSearch={(typeId) => {
//                       setTypeId(typeId);
//                       handleSearch();
//                     }}
//                   />
//                 )}
//               </Col>
//             </Row>
//           </div>
//         }
//         bordered
//         dataSource={filteredList}
//         renderItem={(item, index) => {
//           const parts = item.split(':');
//           const timestamp = parts[2];
//           const typeId = parts.slice(3).join(':');
//           return (
//             <List.Item>
//               <Link to={`/item/${item}`} style={{ width: '100%' }}>
//                 <Row style={{ width: '100%' }}>
//                   <Col span={2}>{index + 1}</Col>
//                   <Col span={11}>{timestamp}</Col>
//                   <Col span={11}>{typeId}</Col>
//                 </Row>
//               </Link>
//             </List.Item>
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default LogItemsPage;

// import React, { useEffect, useState } from 'react';
// import { List, Row, Col, Checkbox, Button } from 'antd';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { fetchItemList, queryItemByTime, queryItemByTypeID } from '../api/logFileApi';
// import TimestampFilter from '../components/TimestampFilter';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';

// const ItemListPage: React.FC = () => {
//   const { filename } = useParams<{ filename: string }>();
//   const [itemList, setItemList] = useState<string[]>([]);
//   const [filteredList, setFilteredList] = useState<string[]>([]);
//   const [timestampVisible, setTimestampVisible] = useState(false);
//   const [typeIdVisible, setTypeIdVisible] = useState(false);
//   const [startTime, setStartTime] = useState<string>('');
//   const [endTime, setEndTime] = useState<string>('');
//   const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
//   const [typeIds, setTypeIds] = useState<string[]>([]);
//   const [logStartTime, setLogStartTime] = useState<string>('');
//   const [logEndTime, setLogEndTime] = useState<string>('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getResult = async () => {
//       if (filename !== undefined) {
//         const result = await fetchItemList(filename);
//         setItemList(result);
//         setFilteredList(result);
//         const fileInfoResponse = await axios.get('http://18.218.252.112:8080/get_file_info', {
//           params: { filename },
//         });
//         const { start, end, type_ids } = fileInfoResponse.data;
//         setTypeIds(type_ids);
//         setLogStartTime(start);
//         setLogEndTime(end);
//       }
//     };
//     getResult();
//   }, [filename]);

//   const handleTypeIdChange = async (checkedValues: any) => {
//     setSelectedTypeIds(checkedValues);
//     if (filename) {
//       try {
//         const typeIdResult = await queryItemByTypeID(filename, checkedValues);
//         console.log('Type ID Result:', typeIdResult); // Debugging line
//         setFilteredList(typeIdResult);
//       } catch (error) {
//         console.error('Error querying items by type IDs:', error);
//       }
//     }
//   };

//   const handleSearch = async () => {
//     let result = itemList;
//     if (filename && startTime && endTime) {
//       try {
//         const timeResult = await queryItemByTime(filename, startTime, endTime);
//         result = result.filter(item => timeResult.includes(item));
//       } catch (error) {
//         console.error('Error querying items by time:', error);
//       }
//     }
//     if (filename && selectedTypeIds.length > 0) {
//       try {
//         const typeIdResult = await queryItemByTypeID(filename, selectedTypeIds);
//         result = result.filter(item => typeIdResult.includes(item));
//       } catch (error) {
//         console.error('Error querying items by type IDs:', error);
//       }
//     }
//     setFilteredList(result);
//   };

//   return (
//     <div>
//       <button onClick={() => navigate(-1)}>Back</button>
//       {filename && (
//         <div>
//           <h2>Log File: {filename}</h2>
//           <p>Start Time: {logStartTime}</p>
//           <p>End Time: {logEndTime}</p>
//         </div>
//       )}
//       <List
//         header={
//           <div>
//             <Row style={{ width: '100%' }}>
//               <Col span={2}><strong> </strong></Col>
//               <Col span={11}>
//                 <strong onClick={() => setTimestampVisible(!timestampVisible)}>
//                   Timestamp {timestampVisible ? <UpOutlined /> : <DownOutlined />}
//                 </strong>
//                 {timestampVisible && (
//                   <TimestampFilter
//                     onSearch={(startTime, endTime) => {
//                       setStartTime(startTime);
//                       setEndTime(endTime);
//                       handleSearch();
//                     }}
//                   />
//                 )}
//               </Col>
//               <Col span={11}>
//                 <strong onClick={() => setTypeIdVisible(!typeIdVisible)}>
//                   Type ID {typeIdVisible ? <UpOutlined /> : <DownOutlined />}
//                 </strong>
//                 {typeIdVisible && (
//                   <Checkbox.Group options={typeIds} onChange={handleTypeIdChange} />
//                 )}
//               </Col>
//             </Row>
//           </div>
//         }
//         bordered
//         dataSource={filteredList}
//         renderItem={(item, index) => {
//           const parts = item.split(':');
//           const timestamp = parts[2];
//           const typeId = parts.slice(3).join(':');
//           return (
//             <List.Item>
//               <Link to={`/item/${item}`} style={{ width: '100%' }}>
//                 <Row style={{ width: '100%' }}>
//                   <Col span={2}>{index + 1}</Col>
//                   <Col span={11}>{timestamp}</Col>
//                   <Col span={11}>{typeId}</Col>
//                 </Row>
//               </Link>
//             </List.Item>
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default ItemListPage;

import React, { useEffect, useState } from 'react';
import { List, Row, Col, Checkbox, Button } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchItemList, queryItemByTime, queryItemByTypeID } from '../api/logFileApi';
import TimestampFilter from '../components/TimestampFilter';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const ItemListPage: React.FC = () => {
  const { filename } = useParams<{ filename: string }>();
  const [itemList, setItemList] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [timestampVisible, setTimestampVisible] = useState(false);
  const [typeIdVisible, setTypeIdVisible] = useState(false);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [typeIds, setTypeIds] = useState<string[]>([]);
  const [logStartTime, setLogStartTime] = useState<string>('');
  const [logEndTime, setLogEndTime] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      if (filename !== undefined) {
        const result = await fetchItemList(filename);
        setItemList(result);
        setFilteredList(result);
        const fileInfoResponse = await axios.get('http://18.218.252.112:8080/get_file_info', {
          params: { filename },
        });
        const { start, end, type_ids } = fileInfoResponse.data;
        setTypeIds(type_ids);
        setLogStartTime(start);
        setLogEndTime(end);
      }
    };
    getResult();
  }, [filename]);

  const handleTypeIdChange = async (checkedValues: any) => {
    setSelectedTypeIds(checkedValues);
    if (filename) {
      try {
        const typeIdResult = await queryItemByTypeID(filename, checkedValues);
        console.log('Type ID Result:', typeIdResult); // Debugging line
        setFilteredList(typeIdResult);
      } catch (error) {
        console.error('Error querying items by type IDs:', error);
      }
    }
  };

  const handleSearch = async () => {
    let result = itemList;
    if (filename && startTime && endTime) {
      try {
        const timeResult = await queryItemByTime(filename, startTime, endTime);
        result = result.filter(item => timeResult.includes(item));
      } catch (error) {
        console.error('Error querying items by time:', error);
      }
    }
    if (filename && selectedTypeIds.length > 0) {
      try {
        const typeIdResult = await queryItemByTypeID(filename, selectedTypeIds);
        result = result.filter(item => typeIdResult.includes(item));
      } catch (error) {
        console.error('Error querying items by type IDs:', error);
      }
    }
    setFilteredList(result);
  };

  const handleDownload = async () => {
    if (!filename || selectedTypeIds.length === 0) {
      alert('Please select some type IDs to filter and download.');
      return;
    }
    try {
      const response = await axios.post('http://18.218.252.112:8080/download_filtered_logfile', {
        filename,
        type_ids: selectedTypeIds,
      }, {
        responseType: 'blob', // Important to handle binary data
      });

      // Debugging: Log the response
      console.log('Backend Response:', response);

      // Debugging: Log the Blob size and type
      console.log('Blob size:', response.data.size);
      console.log('Blob type:', response.data.type);

      //Extract the filename from the response headers
      const contentDisposition = response.headers['content-disposition'];
      const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const downloadFilename = filenameMatch ? filenameMatch[1] : filename;


      // Ensure that the blob is correctly handled and integrity is maintained
      const blob = new Blob([response.data], { type: response.data.type });

      // Create a link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadFilename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading filtered log file:', error);
      alert('Failed to download the filtered log file. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {filename && (
        <div>
          <h2>Log File: {filename}</h2>
          <p>Start Time: {logStartTime}</p>
          <p>End Time: {logEndTime}</p>
        </div>
      )}
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
                  <>
                    <Checkbox.Group options={typeIds} onChange={handleTypeIdChange} />
                    <Button onClick={handleDownload} disabled={selectedTypeIds.length === 0}>
                      Download Filtered Log File
                    </Button>
                  </>
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

export default ItemListPage;















