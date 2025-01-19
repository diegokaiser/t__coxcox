'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apis from '@/libs/apis';
import { Button } from '@/components/atoms';
import customerCancelationEmail from '@/libs/utils/customerCancelationEmail';
import StoreCancelationEmail from '@/libs/utils/storeCancelationEmail';

const PageDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [res, setRes] = useState<Reserva | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const handleCancelReservation = async (reservation: Reserva) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
      setIsCancelled(true);
      setTimeout(() => {
        router.push('/');
      }, 4000);
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
                <strong className="uppercase">Correo electrónico:</strong>{' '}
                {res.usuario.email}
              </div>
            </div>
            {isCancelled && (
              <div className="border-t w-full">
                <div className="p-3 text-center">
                  <strong className="uppercase">RESERVA CANCELADA</strong>
                </div>
              </div>
            )}
          </div>
          {!isCancelled && (
            <div className="flex gap-4 justify-center w-full">
              <Button
                className="danger"
                isLoading={isLoading}
                text="QUIERO CANCELAR MI RESERVA"
                type="button"
                onClick={() => handleCancelReservation(res)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PageDetails;
