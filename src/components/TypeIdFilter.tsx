import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface TypeIdFilterProps {
  typeIds: string[];
  selectedTypeIds: string[];
  onChange: (checkedValues: CheckboxValueType[]) => void;
}

const TypeIdFilter: React.FC<TypeIdFilterProps> = ({ typeIds, selectedTypeIds, onChange }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Checkbox.Group
        value={selectedTypeIds}
        onChange={onChange}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        {typeIds.map(typeId => (
          <Checkbox key={typeId} value={typeId}>
            {typeId}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
};

export default TypeIdFilter;