import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
	QueryConstraint,
} from "firebase/firestore";
import { db } from "@/libs/utils/firebase";
import { horasDelDia } from "@/constants";

const reservations = {
	GetReservation: async (id: string) => {
		try {
			const resRef = doc(db, "reservas", id);
			const resDocSnap = await getDoc(resRef);
			if (resDocSnap.exists()) {
				const { createdAt, ...restData } = resDocSnap.data();
				return { ...restData, key: resDocSnap.id };
			}
			return null;
		} catch (error) {
			console.info(
				`GetReservation: error al obtener la reserva con el id: ${id}`
			);
			console.log(error);
			throw error;
		}
	},
	GetReservations: async () => {
		return reservations.QueryReservations();
	},
	GetReservationsByYear: async (year: string) => {
		return reservations.QueryReservations(where("anyo", "==", year));
	},
	GetReservationsByMonth: async (year: string, month: string) => {
		return reservations.QueryReservations(
			where("anyo", "==", year),
			where("mes", "==", month)
		);
	},
	GetReservationsByDate: async (date: string) => {
		return reservations.QueryReservations(where("fecha", "==", date));
	},
	GetReservationsToday: async (date: string) => {
		try {
			const reservas = (await reservations.GetReservationsByDate(
				date
			)) as Reserva[];
			const horasReservadas = reservas.map((reserva) => reserva.hora);
			const horasDisponibles = horasDelDia.filter(
				(hora) => !horasReservadas.includes(hora)
			);
			return horasDisponibles;
		} catch (error) {
			console.info(
				`GetReservationsToday: error al obtener las fechas de reserva de ${date}`
			);
			console.log(error);
			throw error;
		}
	},
	GetReservationsByFullDate: async (date: string, hour: string) => {
		return reservations.QueryReservations(
			where("fecha", "==", date),
			where("hora", "==", hour)
		);
	},
	GetReservationsByEmail: async (email: string) => {
		return reservations.QueryReservations(where("usuario.email", "==", email));
	},
	GetReservationsByPhone: async (phone: string) => {
		return reservations.QueryReservations(
			where("usuario.telefono", "==", phone)
		);
	},
	GetReservationsByName: async (name: string, lastname: string) => {
		return reservations.QueryReservations(
			where("usuario.nombre", "==", name),
			where("usuario.apellidos", "==", lastname)
		);
	},
	PostReservation: async (res: Reserva) => {
		try {
			const docRef = await addDoc(collection(db, "reservas"), res);
			return docRef.id;
		} catch (error) {
			console.info(`PostReservation: error al registrar la reserva ${res}`);
			console.log(error);
			throw error;
		}
	},
	UpdateReservation: async (id: string, res: Partial<Reserva>) => {
		try {
			const resDocRef = doc(db, "reservas", id);
			await updateDoc(resDocRef, res);
		} catch (error) {
			console.info(`UpdateReservation: error al actualizar la reserva ${id}`);
			console.log(error);
			throw error;
		}
	},
	CancelReservation: async (id: string) => {
		try {
			const resDocRef = doc(db, "reservas", id);
			await deleteDoc(resDocRef);
		} catch (error) {
			console.info(`CancelReservation: error al cancelar la reserva ${id}`);
			console.log(error);
			throw error;
		}
	},
	QueryReservations: async (...constrains: QueryConstraint[]) => {
		try {
			const resRef = collection(db, "reservas");
			const q = query(resRef, ...constrains);
			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.map((doc) => ({
				key: doc.id,
				...doc.data(),
			})) as Reserva[];
		} catch (error) {
			console.info(`QueryReservations: error al ejecutar la consulta`);
			console.log(error);
			throw error;
		}
	},
};

export default reservations;
