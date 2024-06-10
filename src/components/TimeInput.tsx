import React from 'react';
import { Input } from 'antd';

interface TimeInputProps {
  time: { hour: string; minute: string; second: string };
  onChange: (type: 'hour' | 'minute' | 'second', value: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ time, onChange }) => {
  return (
    <div>
      <Input
        placeholder="hh"
        style={{ width: '50px' }}
        onChange={e => onChange('hour', e.target.value)}
        value={time.hour}
      />
      :
      <Input
        placeholder="mm"
        style={{ width: '50px' }}
        onChange={e => onChange('minute', e.target.value)}
        value={time.minute}
      />
      :
      <Input
        placeholder="ss"
        style={{ width: '50px' }}
        onChange={e => onChange('second', e.target.value)}
        value={time.second}
      />
    </div>
  );
};

export default TimeInput;