'use client';

import { CalendarDots } from '@phosphor-icons/react';
import { useState, useRef } from 'react';

interface Props {
  className?: string;
}

const CalendarSelect = ({ className }: Props) => {
  const [date, setDate] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className={`${className} relative`}>
      <div className="absolute bg-white bottom-0 cursor-pointer flex gap-3 items-center left-0 right-0 p-4 text-sm top-0 no-user-select z-10">
        {date == undefined ? (
          <>
            <CalendarDots size={28} /> Seleccionar
          </>
        ) : (
          <>
            <CalendarDots size={28} /> {date}
          </>
        )}
      </div>
      <input
        type="date"
        className="h-full p-4 w-full"
        min={new Date().toISOString().split('T')[0]}
        onChange={handleDateChange}
        ref={inputRef}
      />
    </div>
  );
};

export default CalendarSelect;
