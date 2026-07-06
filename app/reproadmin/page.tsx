"use client";

import { useState } from "react";

export default function ReproAdminIA() {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const responder = () => {
    const texto = pregunta.toLowerCase();

    if (texto.includes("subvención")) {
      setRespuesta(
        "Puedo ayudarte a localizar subvenciones, preparar memorias, presupuestos y documentación necesaria."
      );
    } else if (texto.includes("cita")) {
      setRespuesta(
        "Puedo organizar reuniones, gestionar calendarios y enviar recordatorios."
      );
    } else if (texto.includes("documento")) {
      setRespuesta(
        "Puedo redactar escritos, solicitudes, informes, actas y contratos."
      );
    } else if (texto.includes("empresa")) {
      setRespuesta(
        "Puedo ayudarte con estrategia empresarial, IA, digitalización y automatización."
      );
    } else {
      setRespuesta(
        "Soy ReproAdmin IA. Estoy preparado para ayudarte con administración, empresas, desarrollo territorial y gestión documental."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-4">ReproAdmin IA</h1>

      <p className="text-gray-600 mb-8">
        Asistente Inteligente para Administraciones, Empresas y Desarrollo Territorial.
      </p>

      <textarea
        className="w-full border rounded-lg p-4 h-36"
        placeholder="Escribe tu consulta..."
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
      />

      <button
        onClick={responder}
        className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
      >
        Consultar
      </button>

      {respuesta && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="font-bold mb-2">Respuesta</h2>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
}
