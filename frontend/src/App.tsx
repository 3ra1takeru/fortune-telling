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
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b border-[#444746] bg-[#131314]">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium tracking-tight flex items-center gap-2">
              <span className="text-gradient font-bold text-2xl">Astro Oracle</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E1F20] text-[#A8C7FA] border border-[#444746]">PRO</span>
            </h1>
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            Powered by Statistical BigData
          </div>
        </div>
      </header>

      <main className="container flex-1 py-12">
        <div className="max-w-4xl mx-auto">
          {!result ? (
            <div className="animate-fade-in space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl md:text-5xl font-medium text-[var(--text-primary)]">
                  Unlock your <span className="text-gradient">hidden potential</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                  Advanced fortune telling integrating Western Astrology, Sanmeigaku, Four Pillars, Indian Astrology, and more.
                </p>
              </div>

              <FortuneForm onSubmit={handlePredict} isLoading={loading} />
            </div>
          ) : (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-medium text-[var(--text-primary)]">Analysis Result</h2>
                <button
                  onClick={() => setResult(null)}
                  className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] px-4 py-2"
                >
                  Create New Reading
                </button>
              </div>

              <div className="ai-card p-8 bg-gradient-to-br from-[#1E1F20] to-[#131314]">
                <p className="text-lg leading-relaxed font-light text-[var(--text-primary)]">
                  {result.mainText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="ai-card p-6">
                  <h3 className="text-sm text-[var(--accent-purple)] mb-1 font-mono uppercase tracking-wider">Animal Fortune</h3>
                  <p className="text-3xl font-medium mb-2">{result.animalFortune.animal}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{result.animalFortune.description}</p>
                </div>

                <div className="ai-card p-6">
                  <h3 className="text-sm text-[var(--accent-purple)] mb-1 font-mono uppercase tracking-wider">Shukuyo (宿曜)</h3>
                  <p className="text-3xl font-medium mb-2">{result.shukuyo.innName}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{result.shukuyo.relation}</p>
                </div>

                <div className="ai-card p-6">
                  <h3 className="text-sm text-[var(--accent-cyan)] mb-1 font-mono uppercase tracking-wider">Best Match</h3>
                  <div className="flex items-end gap-4 mb-2">
                    <span className="text-3xl font-medium">{result.compatibility.bestMatchSign}</span>
                    <span className="text-sm text-[var(--text-secondary)] mb-1">Type {result.compatibility.bestMatchBlood}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{result.compatibility.description}</p>
                </div>

                <div className="ai-card p-6 flex flex-col justify-center items-center text-center">
                  <h3 className="text-sm text-[var(--accent-cyan)] mb-2 font-mono uppercase tracking-wider">Lucky Color</h3>
                  <div
                    className="w-16 h-16 rounded-full shadow-inner mb-2"
                    style={{ background: result.luckyColor === 'Royal Blue' ? '#4169E1' : result.luckyColor }}
                  ></div>
                  <p className="text-xl font-medium">{result.luckyColor}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-[var(--text-disabled)] font-mono border-t border-[#444746] mt-12 bg-[#131314]">
        © 2026 ASTRO ORACLE DATALAKE
      </footer>
    </div>
  )
}

export default App
