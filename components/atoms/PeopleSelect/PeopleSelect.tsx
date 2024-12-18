'use client';

import { UsersThree } from '@phosphor-icons/react';
import { useState } from 'react';

interface Props {
  className?: string;
}

const PeopleSelect = ({ className }: Props) => {
  const [people, setPeople] = useState(0);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10) || 0;
    setPeople(value);
  };

  return (
    <div className={`${className} relative`}>
      <div
        className="flex gap-3 items-center p-4 text-sm"
        onClick={() => handleSelect}
      >
        {people == 0 ? (
          <>
            <UsersThree size={28} /> Seleccionar
          </>
        ) : (
          <>
            <UsersThree size={28} /> {people} Pers.
          </>
        )}
      </div>
    </div>
  );
};

export default PeopleSelect;
