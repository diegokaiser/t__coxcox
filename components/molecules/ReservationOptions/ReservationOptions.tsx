import { CalendarSelect, HourSelect, PeopleSelect } from '@/components/atoms';

const ReservationOptions = () => {
  return (
    <>
      <div className="border flex justify-center mb-4 w-full">
        <PeopleSelect className="w-4/12" />
        <CalendarSelect className="w-4/12" />
        <HourSelect className="w-4/12" />
      </div>
    </>
  );
};

export default ReservationOptions;
