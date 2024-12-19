'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { serverTimestamp } from 'firebase/firestore';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Nullable } from 'primereact/ts-helpers';
import {
  CalendarDots,
  ClockAfternoon,
  UsersThree
} from '@phosphor-icons/react';
import { Button } from '@/components/atoms';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import apis from '@/libs/apis';
import reservations from '@/libs/apis/reservations';
import { horasDelDia } from '@/constants';

addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado'
  ],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ],
  monthNamesShort: [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic'
  ],
  today: 'Hoy'
});

const ReservationForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [people, setPeople] = useState('2');
  const [date, setDate] = useState<string>(dayjs().format('MM/DD/YYYY'));
  const [hour, setHour] = useState('');
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [tabActive, setTabActive] = useState('people');
  const [userForm, setUserForm] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    lastname: '',
    email: '',
    mkt: false,
    name: '',
    title: 'Sr.',
    phone: ''
  });

  const minDate = new Date();

  const isValidName = formData.name.trim().length >= 3;
  const isValidLastname = formData.lastname.trim().length >= 5;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isValidPhone = /^[0-9]{1,9}$/.test(formData.phone.trim());

  const isFormValid =
    isValidName && isValidLastname && isValidEmail && isValidPhone;

  const handleTabActive = (step: string) => {
    setUserForm(false);
    setTabActive(step);
  };

  const handleSelectPeople = useCallback((value: string) => {
    setPeople(value);
    setTabActive('date');
  }, []);

  const handleSelectDate = useCallback((value: Nullable<Date>) => {
    if (value) {
      const formattedDate = dayjs(value).format('MM/DD/YYYY');
      setDate(formattedDate);
      setTabActive('hour');
    }
  }, []);

  const handleSelectHour = useCallback((value: string) => {
    setHour(value);
    setTabActive('');
    setUserForm(true);
  }, []);

  const handleReset = () => {
    setPeople('2');
    setDate(dayjs().format('MM/DD/YYYY'));
    setHour('');
    setUserForm(false);
    setTabActive('people');
    setFormData({
      lastname: '',
      email: '',
      mkt: false,
      name: '',
      title: '',
      phone: ''
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!date || !hour || !isFormValid) {
      return;
    }

    const formattedDate = dayjs(date, 'MM/DD/YYYY');

    const reservation = {
      anyo: formattedDate.format('YYYY'),
      dia: formattedDate.format('DD'),
      fecha: date,
      hora: hour,
      mes: formattedDate.format('MM'),
      people,
      usuario: {
        apellidos: formData.lastname,
        email: formData.email,
        mkt: formData.mkt,
        nombre: formData.name,
        telefono: formData.phone,
        titulo: formData.title
      }
    };
    try {
      const resId = await apis.reservations.PostReservation({
        ...reservation,
        createdAt: serverTimestamp() as unknown as Date
      });
      if (resId) {
        router.push(`/reservas/${resId}/exito`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchHours = async () => {
      setIsLoading(true);
      if (!date) return;
      try {
        const available = await reservations.GetReservationsToday(date);
        const today = dayjs().format('MM/DD/YYYY');
        if (date === today) {
          const currentTime = dayjs().format('HH:mm');
          const filteredHours = available.filter((hour) => hour > currentTime);
          setAvailableHours(filteredHours);
        } else {
          setAvailableHours(available);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHours();
  }, [date]);

  return (
    <>
      <div className="flex flex-col items-start justify-center w-full">
        <div className="border flex justify-center mb-4 rounded w-full">
          {['people', 'date', 'hour'].map((step, idx) => (
            <div key={step} className="w-4/12">
              <div
                className={`rounded cursor-pointer flex gap-3 items-center m-2 px-4 py-3 text-sm ${tabActive == step && 'bg-gray-100'}`}
                onClick={() => handleTabActive(step)}
              >
                {idx === 0 && (
                  <>
                    <UsersThree size={28} />
                    {people == '' ? `Seleccionar` : `${people} pers.`}
                  </>
                )}
                {idx === 1 && (
                  <>
                    <CalendarDots size={28} />
                    {date == undefined ? `Seleccionar` : `${date}`}
                  </>
                )}
                {idx === 2 && (
                  <>
                    <ClockAfternoon size={28} />
                    {hour == '' ? `Seleccionar` : `${hour} hrs.`}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {tabActive == 'people' && (
          <>
            <div className="w-full">
              <div className="peopleSelector flex flex-wrap mb-4">
                <button
                  className="w-3/12"
                  onClick={() => handleSelectPeople('1')}
                >
                  <div className="border rounded m-2 p-3">1</div>
                </button>
                <button
                  className="w-3/12"
                  onClick={() => handleSelectPeople('2')}
                >
                  <div className="border rounded m-2 p-3">2</div>
                </button>
                <button
                  className="w-3/12"
                  onClick={() => handleSelectPeople('3')}
                >
                  <div className="border rounded m-2 p-3">3</div>
                </button>
                <button
                  className="w-3/12"
                  onClick={() => handleSelectPeople('4')}
                >
                  <div className="border rounded m-2 p-3">4</div>
                </button>
                <button
                  className="w-3/12"
                  onClick={() => handleSelectPeople('5')}
                >
                  <div className="border rounded m-2 p-3">5</div>
                </button>
                <button
                  className="w-3/12"
                  onClick={() => handleSelectPeople('6')}
                >
                  <div className="border rounded m-2 p-3">6</div>
                </button>
              </div>
              <div className="flex flex-wrap mb-4">
                <button className="w-6/12">
                  <div className="border rounded m-2 p-3">
                    Tengo un grupo mas grande
                  </div>
                </button>
                <button className="w-6/12">
                  <div className="border rounded m-2 p-3">Quiero un evento</div>
                </button>
              </div>
            </div>
          </>
        )}

        {tabActive == 'date' && (
          <>
            <div className="w-full">
              <div className="dateSelector flex justify-center mb-4 w-full">
                <div className="border rounded">
                  <Calendar
                    locale="es"
                    inline
                    minDate={minDate}
                    value={date ? new Date(date) : null}
                    onChange={(e) =>
                      handleSelectDate(e.value as Nullable<Date>)
                    }
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {tabActive == 'hour' && (
          <>
            <div className="w-full">
              <div className="hourSelector flex flex-wrap mb-4">
                {horasDelDia.map((hour) => (
                  <button
                    key={hour}
                    className={`w-3/12 ${availableHours.includes(hour) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() =>
                      availableHours.includes(hour) && handleSelectHour(hour)
                    }
                    disabled={!availableHours.includes(hour)}
                  >
                    <div
                      className={`border rounded m-2 p-3 ${availableHours.includes(hour) ? '' : 'bg-gray-200 text-gray-500'}`}
                    >
                      {hour}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {userForm == true && (
          <form>
            <div className="w-full">
              <div className="userForm flex flex-col my-4">
                <div className="flex flex-wrap mb-4">
                  <div className="mb-3 w-6/12">
                    <div className="flex gap-3 mx-2">
                      {['Sr.', 'Sra.', 'Otro'].map((title) => (
                        <div key={title} className="mr-2">
                          <input
                            className="mr-2"
                            type="radio"
                            name="trato"
                            id={title}
                            value={title}
                            defaultChecked={title === 'Sr.'}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value
                              })
                            }
                          />
                          <label htmlFor={title}>{title}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3 w-6/12">
                    <div className="mx-2"></div>
                  </div>
                  <div className="mb-3 w-6/12">
                    <div className="mx-2">
                      <input
                        className="border rounded p-2 w-full"
                        type="text"
                        placeholder="Introduce tu nombre *"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 w-6/12">
                    <div className="mx-2">
                      <input
                        className="border rounded p-2 w-full"
                        type="text"
                        placeholder="Introduce tus apellidos *"
                        value={formData.lastname}
                        onChange={(e) =>
                          setFormData({ ...formData, lastname: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 w-6/12">
                    <div className="mx-2">
                      <input
                        className="border rounded p-2 w-full"
                        type="text"
                        placeholder="ejemplo@correo.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3 w-6/12">
                    <div className="mx-2">
                      <input
                        className="border rounded p-2 w-full"
                        type="text"
                        placeholder="654 32 19 87"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4 mx-2">
                  <input
                    style={{ height: '21px', width: '21px' }}
                    type="checkbox"
                    id="mkt"
                    name="mkt"
                    checked={formData.mkt}
                    onChange={(e) =>
                      setFormData({ ...formData, mkt: e.target.checked })
                    }
                  />
                  <label className="text-sm" htmlFor="mkt">
                    Quiero registrarme para recibir ofertas especiales y
                    noticias del restaurante por correo electrónico y/o mensaje
                    de texto.
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center w-full">
              <Button
                className="danger"
                inactive={!userForm}
                text="CAMBIAR FECHA"
                type="button"
                onClick={() => handleReset()}
              />
              <Button
                className="success"
                inactive={!isFormValid || isLoading}
                text="RESERVAR"
                type="button"
                onClick={() => handleSubmit()}
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ReservationForm;
