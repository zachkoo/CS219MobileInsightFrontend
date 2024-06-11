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
      if (logItem !== undefined) {
        const result = await fetchItemDetail(logItem);
        setItemDetail(result);
      }
    };
    getResult();
  }, [logItem]);

  const parseMsgField = (msg: string) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(msg, "text/xml");

    const convertXmlToTreeData = (node: Element, parentKey: string = ''): DataNode[] => {
      const children = Array.from(node.children);
      const attributes = Array.from(node.attributes);
      const attributeNodes: DataNode[] = attributes.map((attr, index) => {
        const attrKey = parentKey ? `${parentKey}-attr-${attr.name}` : `attr-${attr.name}`;
        return {
          title: (
            <div>
              <strong>{attr.name}:</strong> {attr.value}
            </div>
          ),
          key: attrKey,
        };
      });
      
      const childNodes: DataNode[] = children.map((child, index) => {
        const nodeKey = parentKey ? `${parentKey}-${index}` : `${index}`;
        return {
          title: child.nodeName,
          key: nodeKey,
          children: convertXmlToTreeData(child, nodeKey),
        };
      });

      const valueNode: DataNode[] = node.textContent?.trim() && !children.length
        ? [{
            title: (
              <div>
                <strong>value:</strong> {node.textContent}
              </div>
            ),
            key: `${parentKey}-value`,
          }]
        : [];

      return [...attributeNodes, ...valueNode, ...childNodes];
    };

    return convertXmlToTreeData(xmlDoc.documentElement);
  };

  const convertToTreeData = (data: any, parentKey: string = ''): DataNode[] => {
    return Object.entries(data).map(([key, value], index) => {
      const nodeKey = parentKey ? `${parentKey}-${key}` : key;
      if (key === 'Msg' && typeof value === 'string') {
        return {
          title: key,
          key: nodeKey,
          children: parseMsgField(value),
        };
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
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