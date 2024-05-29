import React, { useState } from 'react';
import { Input, Button } from 'antd';

interface TypeIdFilterProps {
  onSearch: (typeId: string) => void;
}

const TypeIdFilter: React.FC<TypeIdFilterProps> = ({ onSearch }) => {
  const [typeId, setTypeId] = useState<string>('');

  return (
    <div style={{ marginTop: '10px' }}>
      <Input
        placeholder="Type ID"
        value={typeId}
        onChange={(e) => setTypeId(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button onClick={() => onSearch(typeId)}>Search</Button>
    </div>
  );
};

export default TypeIdFilter;