import { useState } from 'react'
import './index.css'
import FortuneForm, { type FormData } from './components/FortuneForm'

// Full-scope Mock Result Type
type FortuneResult = {
  mainText: string;
  luckyColor: string;

  // 1. Western Astrology
  western: {
    sunSign: string;
    moonSign: string;
    ascendant: string;
    description: string;
  };
  // 2. Animal Fortune (Doubutsu)
  animalFortune: {
    animal: string;
    surface: string;
    hidden: string;
    description: string;
  };
  // 3. Shukuyo (27 Inns)
  shukuyo: {
    innName: string;
    group: string;
    relation: string;
    detail: string;
  };
  // 4. Sanmeigaku (算命学)
  sanmeigaku: {
    mainStar: string; // 鳳閣星 etc
    tenchuseatsu: string; // 戌亥天中殺 etc
    description: string;
  };
  // 5. Four Pillars (四柱推命)
  fourPillars: {
    dayMaster: string; // 甲, 乙...
    strength: string; // 身強/身弱
    description: string;
  };
  // 6. Indian Astrology (Vedic)
  indian: {
    nakshatra: string;
    lord: string;
    description: string;
  };
  // 7. Mayan Calendar
  mayan: {
    kin: string;
    solarSeal: string; // 太陽の紋章
    tone: string; // 銀河の音
    description: string;
  };
  // 8. Nine Star Ki (九星気学)
  nineStar: {
    honmei: string; // 本命星
    getsumei: string; // 月命星
    description: string;
  };
  // 9. Zi Wei Dou Shu (紫微斗数)
  ziwei: {
    mainStar: string; // 紫微星 etc
    palace: string; // 命宮
    description: string;
  };
  // 10. Numerology (数秘術)
  numerology: {
    lifePath: string; // LP
    destiny: string;  // D
    description: string;
  };
  // 11. I Ching (易学)
  iching: {
    hexagram: string; // 卦名
    meaning: string;
  };
  // 12. Teiougaku (帝王学/Stratergy)
  teiougaku: {
    archetype: string;
    strategy: string;
  };

  // Compatibility (Summary)
  compatibility: {
    bestMatchSign: string;
    score: number;
    description: string;
  };
}

function App() {
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (data: FormData) => {
    setLoading(true);
    console.log("Submitting:", data);

    // Simulate API delay with FULL SCOPE mock data
    setTimeout(() => {
      setResult({
        mainText: "【統合鑑定結果】\nあなたの魂は「変革」と「伝統」の融合を求めています。西洋占星術では独創的な革命家を示唆しつつ、東洋の星々はあなたが晩年に向けて精神的指導者となることを予言しています。\n2026年は、マヤ暦においても「新しいサイクルの始まり」を告げており、これまでの準備が花開く運命的な一年となるでしょう。",
        luckyColor: "ロイヤルブルー & ゴールド",

        // 1. Western
        western: {
          sunSign: "太陽：水瓶座",
          moonSign: "月：蠍座",
          ascendant: "ASC：射手座",
          description: "独創的（水瓶）でありながら、深い情念（蠍）を秘めています。ASC射手座により、自由で哲学的な第一印象を与えます。"
        },
        // 2. Animal
        animalFortune: {
          animal: "ペガサス",
          surface: "華やかなこじか",
          hidden: "波乱に満ちたペガサス",
          description: "束縛を嫌う天才肌。直感だけで行動しても成功する稀有なタイプです。"
        },
        // 3. Shukuyo
        shukuyo: {
          innName: "昴宿 (すばるぼし)",
          group: "剛柔宿",
          relation: "名誉と品格の星",
          detail: "27宿の貴族。芸術や学問で名声を博しますが、物質的な執着は薄いです。"
        },
        // 4. Sanmeigaku
        sanmeigaku: {
          mainStar: "鳳閣星 (ほうかくせい)",
          tenchuseatsu: "戌亥天中殺",
          description: "自然体で生きる表現者。戌亥天中殺のため、家系から離れて独自の道を切り拓くことで運が開けます。"
        },
        // 5. Four Pillars
        fourPillars: {
          dayMaster: "甲 (きのえ) - 大樹",
          strength: "身強",
          description: "真っ直ぐに伸びる大樹のように、曲がったことが嫌いな正義の人。挫折を知ることで真のリーダーとなります。"
        },
        // 6. Indian
        indian: {
          nakshatra: "アシュヴィニー (Ashwini)",
          lord: "ケートゥ (Ketu)",
          description: "スピードと癒しの力を持つ「馬の頭」。医療やヒーリング、または最先端技術に適性があります。"
        },
        // 7. Mayan
        mayan: {
          kin: "KIN 1",
          solarSeal: "赤い竜 (Imix)",
          tone: "磁気の音 (1)",
          description: "誕生の力、創始のエネルギー。物事をゼロから生み出す原動力を持ったリーダーです。"
        },
        // 8. Nine Star Ki
        nineStar: {
          honmei: "一白水星",
          getsumei: "四緑木星",
          description: "水のように柔軟で、どんな環境にも適応します。知性的で思慮深く、晩年になるほど運気が上昇します。"
        },
        // 9. Zi Wei Dou Shu
        ziwei: {
          mainStar: "紫微星 (しびせい)",
          palace: "命宮",
          description: "帝王の星。尊厳とリーダーシップを持ち、周囲の人ごみを統率する能力が備わっています。"
        },
        // 10. Numerology
        numerology: {
          lifePath: "LP 33 (マスターナンバー)",
          destiny: "D 6",
          description: "規格外の愛と奉仕の人。常識の枠に収まらないスケールの大きさで、人類全体に貢献する使命を持ちます。"
        },
        // 11. I Ching
        iching: {
          hexagram: "乾為天 (けんいてん)",
          meaning: "龍が天を舞う、最強の運気。迷わず進むことで大成します。"
        },
        // 12. Teiougaku
        teiougaku: {
          archetype: "創業者型",
          strategy: "0から1を生み出すカリスマ性で組織を牽引する。参謀役を置くことが成功の鍵。"
        },

        compatibility: {
          bestMatchSign: "獅子座",
          score: 98,
          description: "お互いのビジョンを共有できるソウルメイトです。"
        }
      });
      setLoading(false);
    }, 2500);
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
        <div className="max-w-6xl mx-auto">
          {!result ? (
            <div className="animate-fade-in space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-5xl font-medium text-[var(--text-primary)] leading-tight">
                  <span className="text-gradient">全12占術</span>を統合した<br />
                  究極の運命解析
                </h2>
                <p className="text-[var(--text-secondary)] text-md md:text-lg max-w-2xl mx-auto leading-loose">
                  西洋・東洋の叡智を結集。<br />
                  あなたの運命を多角的な視点から完全にデコードします。
                </p>
              </div>

              <FortuneForm onSubmit={handlePredict} isLoading={loading} />
            </div>
          ) : (
            <div className="animate-fade-in space-y-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-medium text-[var(--text-primary)]">完全鑑定レポート</h2>
                <button
                  onClick={() => setResult(null)}
                  className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] px-4 py-2"
                >
                  再鑑定
                </button>
              </div>

              {/* Main Analysis */}
              <div className="ai-card p-8 bg-gradient-to-br from-[#1E1F20] to-[#131314] shadow-lg">
                <h3 className="text-sm text-[var(--text-secondary)] mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  【統合】 総合運勢・本質
                </h3>
                <p className="text-lg leading-loose font-light text-[var(--text-primary)] whitespace-pre-wrap">
                  {result.mainText}
                </p>
              </div>

              {/* Grid 1: Major Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {/* 1. Western */}
                <div className="ai-card p-6 border-t-4 border-t-[var(--primary)]">
                  <h3 className="text-xs text-[var(--primary)] mb-3 font-mono uppercase tracking-widest">1. 西洋占星術</h3>
                  <div className="space-y-2 mb-3">
                    <p className="font-bold text-lg">{result.western.sunSign}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{result.western.moonSign} / {result.western.ascendant}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{result.western.description}</p>
                </div>

                {/* 2. Sanmeigaku */}
                <div className="ai-card p-6 border-t-4 border-t-[#FFAB91]">
                  <h3 className="text-xs text-[#FFAB91] mb-3 font-mono uppercase tracking-widest">2. 算命学</h3>
                  <div className="space-y-2 mb-3">
                    <p className="font-bold text-lg">{result.sanmeigaku.mainStar}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{result.sanmeigaku.tenchuseatsu}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{result.sanmeigaku.description}</p>
                </div>

                {/* 3. Four Pillars */}
                <div className="ai-card p-6 border-t-4 border-t-[#81C784]">
                  <h3 className="text-xs text-[#81C784] mb-3 font-mono uppercase tracking-widest">3. 四柱推命</h3>
                  <div className="space-y-2 mb-3">
                    <p className="font-bold text-lg">{result.fourPillars.dayMaster}</p>
                    <p className="text-sm text-[var(--text-secondary)]">強弱: {result.fourPillars.strength}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{result.fourPillars.description}</p>
                </div>

                {/* 4. Animal */}
                <div className="ai-card p-6 border-t-4 border-t-[#FFD54F]">
                  <h3 className="text-xs text-[#FFD54F] mb-3 font-mono uppercase tracking-widest">4. どうぶつ占い</h3>
                  <div className="space-y-2 mb-3">
                    <p className="font-bold text-lg">{result.animalFortune.animal}</p>
                    <p className="text-xs text-[var(--text-secondary)]">表面: {result.animalFortune.surface}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{result.animalFortune.description}</p>
                </div>

                {/* 5. Shukuyo */}
                <div className="ai-card p-6 border-t-4 border-t-[#BA68C8]">
                  <h3 className="text-xs text-[#BA68C8] mb-3 font-mono uppercase tracking-widest">5. 宿曜占星術</h3>
                  <div className="space-y-2 mb-3">
                    <p className="font-bold text-lg">{result.shukuyo.innName}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{result.shukuyo.group} / {result.shukuyo.relation}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{result.shukuyo.detail}</p>
                </div>

                {/* 6. Indian */}
                <div className="ai-card p-6 border-t-4 border-t-[#4DB6AC]">
                  <h3 className="text-xs text-[#4DB6AC] mb-3 font-mono uppercase tracking-widest">6. インド占星術</h3>
                  <div className="space-y-2 mb-3">
                    <p className="font-bold text-lg">{result.indian.nakshatra}</p>
                    <p className="text-sm text-[var(--text-secondary)]">支配星: {result.indian.lord}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{result.indian.description}</p>
                </div>

              </div>

              {/* Grid 2: Additional Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {/* 7. Mayan */}
                <div className="ai-card p-5 bg-[#171819]">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs text-[var(--text-secondary)] font-mono uppercase">7. マヤ暦</h3>
                  </div>
                  <p className="font-bold text-md mb-1">{result.mayan.kin} - {result.mayan.solarSeal}</p>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{result.mayan.tone}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{result.mayan.description}</p>
                </div>

                {/* 8. Nine Star */}
                <div className="ai-card p-5 bg-[#171819]">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs text-[var(--text-secondary)] font-mono uppercase">8. 九星気学</h3>
                  </div>
                  <p className="font-bold text-md mb-1">{result.nineStar.honmei} / {result.nineStar.getsumei}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{result.nineStar.description}</p>
                </div>

                {/* 9. Zi Wei Dou Shu */}
                <div className="ai-card p-5 bg-[#171819]">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs text-[var(--text-secondary)] font-mono uppercase">9. 紫微斗数</h3>
                  </div>
                  <p className="font-bold text-md mb-1">{result.ziwei.mainStar}</p>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{result.ziwei.palace}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{result.ziwei.description}</p>
                </div>

                {/* 10. Numerology */}
                <div className="ai-card p-5 bg-[#171819]">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs text-[var(--text-secondary)] font-mono uppercase">10. 数秘術</h3>
                  </div>
                  <p className="font-bold text-md mb-1">{result.numerology.lifePath}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{result.numerology.description}</p>
                </div>

                {/* 11. I Ching */}
                <div className="ai-card p-5 bg-[#171819]">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs text-[var(--text-secondary)] font-mono uppercase">11. 易学</h3>
                  </div>
                  <p className="font-bold text-md mb-1">{result.iching.hexagram}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{result.iching.meaning}</p>
                </div>

                {/* 12. Teiougaku */}
                <div className="ai-card p-5 bg-[#171819]">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs text-[var(--text-secondary)] font-mono uppercase">12. 帝王学</h3>
                  </div>
                  <p className="font-bold text-md mb-1">{result.teiougaku.archetype}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{result.teiougaku.strategy}</p>
                </div>

              </div>

              <div className="pt-8 text-center">
                <p className="text-sm text-[var(--text-secondary)] mb-2">ラッキーカラー</p>
                <div className="inline-flex items-center gap-3 bg-[#1E1F20] px-4 py-2 rounded-full border border border-[#444746]">
                  <div className="w-4 h-4 rounded-full" style={{ background: '#4169E1' }}></div>
                  <span className="font-bold">{result.luckyColor}</span>
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
