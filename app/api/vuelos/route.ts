import { NextResponse } from 'next/server';
import { Duffel } from '@duffel/api';

const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const origen: string = body.origen;
    const destino: string = body.destino;
    const fecha: string = body.fecha;
    const pasajeros: number = body.pasajeros;

    const offerRequest = await duffel.offerRequests.create({
  slices: [
    {
  origin: origen,
  destination: destino,
  departure_date: fecha,
  arrival_time: null,
  departure_time: null,
},
  ],
  passengers: Array(pasajeros).fill({ type: 'adult' as const }),
  cabin_class: 'economy' as const,
});

    const offers = await duffel.offers.list({
      offer_request_id: offerRequest.data.id,
      sort: 'total_amount',
      limit: 10,
    });

    const vuelos = offers.data.map(offer => ({
      id: offer.id,
      precio: offer.total_amount,
      moneda: offer.total_currency,
      aerolinea: offer.owner.name,
      duracion: offer.slices[0].duration,
      salida: offer.slices[0].segments[0].departing_at,
      llegada: offer.slices[0].segments[offer.slices[0].segments.length - 1].arriving_at,
      escalas: offer.slices[0].segments.length - 1,
      origen: offer.slices[0].segments[0].origin.iata_code,
      destino: offer.slices[0].segments[offer.slices[0].segments.length - 1].destination.iata_code,
    }));

    return NextResponse.json({ vuelos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}