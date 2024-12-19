'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apis from '@/libs/apis';
import { Button } from '@/components/atoms';
import customerCancelationEmail from '@/libs/utils/customerCancelationEmail';
import StoreCancelationEmail from '@/libs/utils/storeCancelationEmail';

const PageDetails = () => {
  const { id } = useParams();
  const [res, setRes] = useState<Reserva | null>(null);

  const handleCancelReservation = async (reservation: Reserva) => {
    try {
      if (!id) {
        return;
      }
      await apis.reservations.CancelReservation(id as string);
    } catch (error) {
      console.info(
        'app/reservas/[id]/detalles/page.tsx/handleCancelReservation()'
      );
      console.error(error);
    }
    await customerCancelationEmail(reservation as Reserva);
    await StoreCancelationEmail(reservation as Reserva);
  };

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
        }
      } catch (error) {
        console.info('app/reservas/[id]/detalles/page.tsx/fetchReservation()');
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
              <p className="uppercase">Datos de reserva</p>
            </div>
          </div>
          <div className="border flex flex-wrap mb-4 rounded w-full">
            <div className="border-r w-6/12">
              <div className="p-3">
                <strong className="uppercase">Fecha:</strong> {res.fecha}
              </div>
            </div>
            <div className="w-6/12">
              <div className="p-3">
                <strong className="uppercase">Hora:</strong> {res.hora}
              </div>
            </div>
            <div className="border-r border-t w-6/12">
              <div className="p-3">
                <strong className="uppercase">Reserva para:</strong>{' '}
                {res.people} {res.people != '1' ? 'personas' : 'persona'}
              </div>
            </div>
            <div className="border-t w-6/12">
              <div className="p-3">
                <strong className="uppercase">Móvil:</strong>{' '}
                {res.usuario.telefono}
              </div>
            </div>
            <div className="border-t w-full">
              <div className="p-3">
                <strong className="uppercase">Reservado para:</strong>{' '}
                {res.usuario.nombre} {res.usuario.apellidos}
              </div>
            </div>
            <div className="border-t w-full">
              <div className="p-3">
                <strong className="uppercase">Correo electrónico:</strong>
                {res.usuario.email}
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center w-full">
            <Button
              className="danger"
              text="QUIERO CANCELAR MI RESERVA"
              type="button"
              onClick={() => handleCancelReservation(res)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PageDetails;
