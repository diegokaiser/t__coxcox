'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChefHat } from '@phosphor-icons/react';
import apis from '@/libs/apis';
import CustomerReservationEmail from '@/libs/utils/customerReservationEmail';
import StoreReservationEmail from '@/libs/utils/storeReservationEmail';

const PageExito = () => {
  const { id } = useParams();
  const [res, setRes] = useState<Reserva | null>(null);
  const emailSentRef = useRef(false);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        if (!id) {
          return;
        }
        const reservation = await apis.reservations.GetReservation(
          id as string
        );
        if (reservation) {
          setRes(reservation as Reserva);
          if (!emailSentRef.current) {
            emailSentRef.current = true;
            await CustomerReservationEmail(reservation as Reserva);
            await StoreReservationEmail(reservation as Reserva);
          }
        }
      } catch (error) {
        console.info('app/reservas/[id]/exito/page.tsx/fetchReservation()');
        console.error(error);
      }
    };
    fetchReservation();
  }, [id]);

  return (
    <>
      {res && (
        <div className="flex flex-col items-start justify-center text-sm w-full">
          <div className="border flex justify-center mb-4 rounded w-full">
            <div className="rounded cursor-pointer flex gap-3 items-center m-2 px-4 py-3">
              <p className="uppercase">Reserva confirmada</p>
            </div>
          </div>
          <div className="flex flex-col items-center mb-4 w-full">
            <ChefHat size={63} />
            <p className="mb-1 mt-3">Tu reserva esta confirmada para:</p>
            <p className="mb-3 mt-3">
              El {res.fecha} a las {res.hora} hrs.
            </p>
            <p className="mb-4 text-center">
              Hemos enviado un correo electrónico a {res.usuario.email} con los
              detalles
            </p>
            <p>Gracias por tu preferencia</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PageExito;
