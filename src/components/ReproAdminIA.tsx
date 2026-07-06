"use client";

import { useState } from 'react';

export default function ReproAdminIA() {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const responder = () => {
    const texto = pregunta.toLowerCase();

    if (texto.includes('subvención')) {
      setRespuesta('Puedo ayudarte a localizar subvenciones, preparar memorias, presupuestos y documentación necesaria.');
    } else if (texto.includes('cita')) {
      setRespuesta('Puedo organizar reuniones, gestionar calendarios y enviar recordatorios.');
    } else if (texto.includes('documento')) {
      setRespuesta('Puedo redactar escritos, solicitudes, informes, actas y contratos.');
    } else if (texto.includes('empresa')) {
      setRespuesta('Puedo ayudarte con estrategia empresarial, IA, digitalización y automatización.');
    } else {
      setRespuesta('Soy ReproAdmin IA. Estoy preparado para ayudarte con administración, empresas, desarrollo territorial y gestión documental.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-4 text-4xl font-bold text-green-700">ReproAdmin IA</h1>

      <p className="mb-8 text-gray-600">Asistente Inteligente para Administraciones, Empresas y Desarrollo Territorial.</p>

      <textarea
        className="h-36 w-full rounded-lg border p-4"
        placeholder="Escribe tu consulta..."
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
      />

      <button
        onClick={responder}
        className="mt-4 rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800"
      >
        Consultar
      </button>

      {respuesta && (
        <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="mb-2 font-bold">Respuesta</h2>

          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
}
