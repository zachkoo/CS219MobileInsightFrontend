// src/components/TypeIdFilter.tsx

import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface TypeIdFilterProps {
  typeIds: string[];
  selectedTypeIds: string[];
  onChange: (checkedValues: CheckboxValueType[]) => void;
}

const TypeIdFilter: React.FC<TypeIdFilterProps> = ({ typeIds, selectedTypeIds, onChange }) => (
  <Checkbox.Group
    options={typeIds}
    value={selectedTypeIds}
    onChange={onChange}
  />
);

export default TypeIdFilter;