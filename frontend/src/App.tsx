import { useState } from 'react'
import './index.css'
import FortuneForm, { type FormData } from './components/FortuneForm'

// Mock result type
type FortuneResult = {
  mainText: string;
  charts: any;
  luckyColor: string;
  animalFortune: {
    animal: string;
    description: string;
  };
  shukuyo: {
    innName: string;
    relation: string;
  };
  compatibility: {
    bestMatchSign: string;
    bestMatchBlood: string;
    description: string;
  };
}

function App() {
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (data: FormData) => {
    setLoading(true);
    // TODO: Call Worker API
    console.log("Submitting:", data);

    // Simulate API delay with improved mock data
    setTimeout(() => {
      setResult({
        mainText: "あなたの本質は、静かな情熱を秘めた改革者です。星々の配置は、今が新しい挑戦に最適な時期であることを示しています。",
        charts: {},
        luckyColor: "Royal Blue",
        animalFortune: {
          animal: "Pegasus (ペガサス)",
          description: "束縛を嫌い、自由な発想で飛び回る天才肌。"
        },
        shukuyo: {
          innName: "Subaru (昴宿)",
          relation: "名誉と品格を重んじる貴族的な星。"
        },
        compatibility: {
          bestMatchSign: "Leo (獅子座)",
          bestMatchBlood: "B",
          description: "情熱的なリーダータイプとの相性が抜群です。互いに高め合える関係になるでしょう。"
        }
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <header className="mb-12 text-center animate-fade-in relative z-10">
        <h1 className="text-5xl md:text-7xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 glow-text" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #a78bfa, #60a5fa)' }}>
          ASTRO ORACLE
        </h1>
        <p className="text-lg text-slate-400 tracking-widest uppercase mb-2">
          The Ultimate Data-Driven Fortune Telling
        </p>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          Integrating Western Astrology, Sanmeigaku, Four Pillars, Indian Astrology, Mayan Calendar, Numerology, I Ching, and more.
        </p>
      </header>

      <main className="w-full max-w-4xl z-10">
        {!result ? (
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <FortuneForm onSubmit={handlePredict} isLoading={loading} />
          </div>
        ) : (
          <div className="glass-panel p-8 animate-fade-in space-y-8">
            <div className="text-center">
              <h2 className="text-3xl mb-4 text-accent-gold" style={{ color: 'var(--accent-gold)' }}>鑑定結果</h2>
              <div className="p-6 bg-black/20 rounded-xl">
                <p className="text-xl leading-relaxed">
                  {result.mainText}
                </p>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="text-lg text-purple-300 mb-2">Lucky Color</h3>
                <p className="text-2xl font-bold">{result.luckyColor}</p>
              </div>

              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="text-lg text-purple-300 mb-2">Animal Fortune</h3>
                <p className="text-2xl font-bold">{result.animalFortune.animal}</p>
                <p className="text-sm text-gray-400 mt-1">{result.animalFortune.description}</p>
              </div>

              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="text-lg text-purple-300 mb-2">Shukuyo (宿曜)</h3>
                <p className="text-2xl font-bold">{result.shukuyo.innName}</p>
                <p className="text-sm text-gray-400 mt-1">{result.shukuyo.relation}</p>
              </div>

              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="text-lg text-purple-300 mb-2">Best Match</h3>
                <p className="text-lg">
                  <span className="font-bold text-xl block">{result.compatibility.bestMatchSign}</span>
                  <span className="text-sm text-gray-400">Blood Type: {result.compatibility.bestMatchBlood}</span>
                </p>
                <p className="mt-2 text-sm text-gray-300">{result.compatibility.description}</p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setResult(null)}
                className="btn-primary"
              >
                Another Reading
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
