import { Header } from '@/components/molecules';
import { ReservationForm } from '@/components/organisms';

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="container flex justify-center">
        <div className="w-11/12 sm:w-4/12">
          <Header />
          <div className="flex justify-center w-full">
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
