import React, { useState } from 'react';
import { Input, Button } from 'antd';

interface TimestampFilterProps {
  onSearch: (startTime: string, endTime: string) => void;
}

const TimestampFilter: React.FC<TimestampFilterProps> = ({ onSearch }) => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  return (
    <div style={{ marginTop: '10px' }}>
      <Input
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Input
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button onClick={() => onSearch(startTime, endTime)}>Search</Button>
    </div>
  );
};

export default TimestampFilter;