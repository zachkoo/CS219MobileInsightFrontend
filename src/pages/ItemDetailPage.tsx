import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import { fetchItemDetail } from '../api/logFileApi';

const ItemDetailPage: React.FC = () => {
  const { logItem } = useParams<{ logItem: string }>();
  const [itemDetail, setItemDetail] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      if (logItem !== undefined){
        const result = await fetchItemDetail(logItem);
        setItemDetail(result);
      }   
    };
    getResult();
  }, [logItem]);

  const convertToTreeData = (data: any, parentKey: string = ''): DataNode[] => {
    return Object.entries(data).map(([key, value], index) => {
      const nodeKey = parentKey ? `${parentKey}-${key}` : key;
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return {
          title: key,
          key: nodeKey,
          children: convertToTreeData(value, nodeKey),
        };
      }
      return {
        title: (
          <div>
            <strong>{key}:</strong> {JSON.stringify(value)}
          </div>
        ),
        key: nodeKey,
      };
    });
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {itemDetail && (
        <Tree
          treeData={convertToTreeData(itemDetail)}
          defaultExpandAll
          style={{ marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default ItemDetailPage;