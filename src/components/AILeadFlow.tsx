import { useState } from 'react';

export default function AILeadFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    aire: null,
    aislamiento: null,
    ayudas: null
  });

  const handleAnswer = (key: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const resetFlow = () => {
    setStep(0);
    setAnswers({ aire: null, aislamiento: null, ayudas: null });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
      <h2 className="mb-8 text-2xl font-bold">🤖 IA: Flujo de Oportunidades</h2>

      {/* Inicio */}
      {step === 0 && (
        <div className="space-y-6">
          <div className="rounded-xl border-l-4 border-cyan-400 bg-slate-800/50 p-6">
            <p className="text-lg font-semibold text-slate-200">👤 Cliente</p>
            <p className="mt-2 text-slate-300">Quiere cambiar ventanas</p>
          </div>

          <div className="flex justify-center">
            <span className="text-2xl text-cyan-300">↓</span>
          </div>

          <div className="rounded-xl border-l-4 border-emerald-400 bg-slate-800/50 p-6">
            <p className="mb-4 text-lg font-semibold text-emerald-300">🤖 IA pregunta</p>
            <p className="text-slate-300">¿Tiene aire acondicionado antiguo?</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleAnswer('aire', true)}
                className="rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white hover:bg-emerald-700"
              >
                Sí
              </button>
              <button
                onClick={() => handleAnswer('aire', false)}
                className="rounded-lg bg-slate-700 px-6 py-2 font-semibold text-white hover:bg-slate-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pregunta 1 respondida */}
      {step >= 1 && answers.aire !== null && (
        <div className="space-y-6">
          <div className="rounded-xl border-l-4 border-cyan-400 bg-slate-800/50 p-6">
            <p className="text-lg font-semibold text-slate-200">👤 Cliente</p>
            <p className="mt-2 text-slate-300">
              {answers.aire ? '✓ Sí, tiene aire antiguo' : '✗ No tiene aire acondicionado antiguo'}
            </p>
          </div>

          {answers.aire && (
            <>
              <div className="flex justify-center">
                <span className="text-2xl text-cyan-300">↓</span>
              </div>

              <div className="rounded-xl border-l-4 border-emerald-400 bg-slate-800/50 p-6">
                <p className="mb-4 text-lg font-semibold text-emerald-300">🤖 IA pregunta</p>
                <p className="text-slate-300">¿Le interesa mejorar el aislamiento?</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleAnswer('aislamiento', true)}
                    className="rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white hover:bg-emerald-700"
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => handleAnswer('aislamiento', false)}
                    className="rounded-lg bg-slate-700 px-6 py-2 font-semibold text-white hover:bg-slate-600"
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          )}

          {!answers.aire && (
            <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
              <p className="text-center text-slate-400">Continuará con otras oportunidades...</p>
              <button
                onClick={resetFlow}
                className="mt-4 w-full rounded-lg bg-slate-700 py-2 font-semibold text-white hover:bg-slate-600"
              >
                Reiniciar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pregunta 2 respondida */}
      {step >= 2 && answers.aislamiento !== null && (
        <div className="space-y-6">
          <div className="rounded-xl border-l-4 border-cyan-400 bg-slate-800/50 p-6">
            <p className="text-lg font-semibold text-slate-200">👤 Cliente</p>
            <p className="mt-2 text-slate-300">
              {answers.aislamiento ? '✓ Sí, le interesa mejorar aislamiento' : '✗ No le interesa aislamiento'}
            </p>
          </div>

          {answers.aislamiento && (
            <>
              <div className="flex justify-center">
                <span className="text-2xl text-cyan-300">↓</span>
              </div>

              <div className="rounded-xl border-l-4 border-emerald-400 bg-slate-800/50 p-6">
                <p className="mb-4 text-lg font-semibold text-emerald-300">🤖 IA pregunta</p>
                <p className="text-slate-300">¿Quiere conocer ayudas disponibles?</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleAnswer('ayudas', true)}
                    className="rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white hover:bg-emerald-700"
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => handleAnswer('ayudas', false)}
                    className="rounded-lg bg-slate-700 px-6 py-2 font-semibold text-white hover:bg-slate-600"
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          )}

          {!answers.aislamiento && (
            <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
              <p className="text-center text-slate-400">Continuará con otras oportunidades...</p>
              <button
                onClick={resetFlow}
                className="mt-4 w-full rounded-lg bg-slate-700 py-2 font-semibold text-white hover:bg-slate-600"
              >
                Reiniciar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Resultado final */}
      {step >= 3 && answers.ayudas !== null && (
        <div className="space-y-6">
          <div className="rounded-xl border-l-4 border-cyan-400 bg-slate-800/50 p-6">
            <p className="text-lg font-semibold text-slate-200">👤 Cliente</p>
            <p className="mt-2 text-slate-300">
              {answers.ayudas ? '✓ Sí, quiere conocer ayudas' : '✗ No quiere conocer ayudas'}
            </p>
          </div>

          {answers.ayudas && (
            <>
              <div className="flex justify-center">
                <span className="text-2xl text-cyan-300">↓</span>
              </div>

              <div className="rounded-xl border-l-4 border-amber-400 bg-slate-800/50 p-6">
                <p className="mb-6 text-lg font-semibold text-amber-300">✓ Se generan dos oportunidades</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-emerald-400/50 bg-emerald-900/30 p-4">
                    <p className="text-emerald-300">✓ Ventanas</p>
                    <p className="mt-2 text-xs text-slate-400">PVC, ALUMINIO, CRISTAL</p>
                  </div>
                  <div className="rounded-lg border border-cyan-400/50 bg-cyan-900/30 p-4">
                    <p className="text-cyan-300">✓ Climatización</p>
                    <p className="mt-2 text-xs text-slate-400">Aerotermia, Aire Acondicionado</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {!answers.ayudas && (
            <div className="rounded-xl border-l-4 border-amber-400 bg-slate-800/50 p-6">
              <p className="mb-4 text-lg font-semibold text-amber-300">✓ Oportunidad generada</p>
              <div className="rounded-lg border border-emerald-400/50 bg-emerald-900/30 p-4">
                <p className="text-emerald-300">✓ Ventanas</p>
                <p className="mt-2 text-xs text-slate-400">PVC, ALUMINIO, CRISTAL</p>
              </div>
            </div>
          )}

          <button
            onClick={resetFlow}
            className="w-full rounded-lg bg-slate-700 py-2 font-semibold text-white hover:bg-slate-600"
          >
            Reiniciar Flujo
          </button>
        </div>
      )}
    </div>
  );
}
