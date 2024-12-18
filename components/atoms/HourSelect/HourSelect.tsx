'use client';

import { ClockAfternoon } from '@phosphor-icons/react';
import { useState } from 'react';

interface Props {
  className?: string;
}

const HourSelect = ({ className }: Props) => {
  const [hour, setHour] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setHour(value);
  };

  return (
    <div className={`${className} relative`}>
      <div className="absolute bg-white bottom-0 flex gap-3 items-center left-0 right-0 p-4 text-sm top-0 no-user-select z-10">
        {hour == '' ? (
          <>
            <ClockAfternoon size={28} /> Seleccionar
          </>
        ) : (
          <>
            <ClockAfternoon size={28} /> {hour} hrs.
          </>
        )}
      </div>
      <select className="h-full no-select p-4 w-full" onChange={handleSelect}>
        <option value="">Seleccionar</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
      </select>
    </div>
  );
};

export default HourSelect;
