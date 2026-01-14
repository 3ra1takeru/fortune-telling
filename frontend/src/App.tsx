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
        mainText: "あなたの星配置は、静かな情熱を秘めた「変革者」であることを示しています。現在は大きな転換期にあり、直感を信じて行動することで新しい可能性が開かれるでしょう。特にコミュニケーションの場において、あなたの言葉が周囲に大きな影響を与えます。",
        charts: {},
        luckyColor: "ロイヤルブルー",
        animalFortune: {
          animal: "ペガサス",
          description: "束縛を嫌い、自由な発想で大空を駆け巡る天才肌。直感力はずば抜けています。"
        },
        shukuyo: {
          innName: "昴宿 (すばるぼし)",
          relation: "名誉と品格を重んじる、貴族的な精神の持ち主。芸術的な才能に恵まれます。"
        },
        compatibility: {
          bestMatchSign: "獅子座",
          bestMatchBlood: "B型",
          description: "情熱的でリーダーシップのある相手と、互いに高め合える最高の相性です。"
        }
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-5 border-b border-[#444746] bg-[#131314]">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium tracking-tight flex items-center gap-2">
              <span className="text-gradient font-bold text-2xl">究極の占い</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E1F20] text-[#A8C7FA] border border-[#444746]">PRO</span>
            </h1>
          </div>
          <div className="text-sm text-[var(--text-secondary)] hidden md:block">
            Statistical BigData Astrology
          </div>
        </div>
      </header>

      <main className="container flex-1 py-12">
        <div className="max-w-4xl mx-auto">
          {!result ? (
            <div className="animate-fade-in space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-5xl font-medium text-[var(--text-primary)] leading-tight">
                  あなたの<span className="text-gradient">隠された可能性</span>を<br />
                  データで紐解く
                </h2>
                <p className="text-[var(--text-secondary)] text-md md:text-lg max-w-2xl mx-auto leading-loose">
                  西洋占星術、算命学、四柱推命、インド占星術など、<br className="hidden md:inline" />
                  世界中の統計的占術を統合した、究極の鑑定AI。
                </p>
              </div>

              <FortuneForm onSubmit={handlePredict} isLoading={loading} />
            </div>
          ) : (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-medium text-[var(--text-primary)]">鑑定結果</h2>
                <button
                  onClick={() => setResult(null)}
                  className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] px-4 py-2"
                >
                  新しい鑑定を作成
                </button>
              </div>

              <div className="ai-card p-8 bg-gradient-to-br from-[#1E1F20] to-[#131314]">
                <h3 className="text-sm text-[var(--text-secondary)] mb-4">総合鑑定</h3>
                <p className="text-lg leading-loose font-light text-[var(--text-primary)]">
                  {result.mainText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="ai-card p-6">
                  <h3 className="text-sm text-[var(--accent-purple)] mb-2 font-mono tracking-wider">どうぶつ占い</h3>
                  <p className="text-3xl font-medium mb-3">{result.animalFortune.animal}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{result.animalFortune.description}</p>
                </div>

                <div className="ai-card p-6">
                  <h3 className="text-sm text-[var(--accent-purple)] mb-2 font-mono tracking-wider">宿曜占星術</h3>
                  <p className="text-3xl font-medium mb-3">{result.shukuyo.innName}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{result.shukuyo.relation}</p>
                </div>

                <div className="ai-card p-6">
                  <h3 className="text-sm text-[var(--accent-cyan)] mb-2 font-mono tracking-wider">最高の相性</h3>
                  <div className="flex items-end gap-4 mb-3">
                    <span className="text-3xl font-medium">{result.compatibility.bestMatchSign}</span>
                    <span className="text-sm text-[var(--text-secondary)] mb-1">血液型 {result.compatibility.bestMatchBlood}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{result.compatibility.description}</p>
                </div>

                <div className="ai-card p-6 flex flex-col justify-center items-center text-center">
                  <h3 className="text-sm text-[var(--accent-cyan)] mb-4 font-mono tracking-wider">ラッキーカラー</h3>
                  <div
                    className="w-16 h-16 rounded-full shadow-inner mb-4 border border-white/10"
                    style={{ background: result.luckyColor === 'ロイヤルブルー' ? '#4169E1' : result.luckyColor }}
                  ></div>
                  <p className="text-xl font-medium">{result.luckyColor}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-[var(--text-disabled)] font-mono border-t border-[#444746] mt-12 bg-[#131314]">
        © 2026 ASTRO ORACLE DATALAKE
      </footer>
    </div>
  )
}

export default App
