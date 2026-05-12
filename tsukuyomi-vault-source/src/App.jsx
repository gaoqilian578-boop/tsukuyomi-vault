import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, LockKeyhole, Moon, Sparkles } from "lucide-react";

const PASS_PHRASE = "月の夜";
const AUTH_KEY = "tsukuyomi-vault-authenticated";

const categories = ["すべて", "彼の本音", "復縁と執着", "四柱推命", "タロットと夜ワーク"];

const bonuses = [
  ["彼の沈黙に隠れた月のサイン", "沈黙を拒絶だけで読まず、心の揺れとして見つめ直す夜。", "彼の本音", "月・偏印・静寂"],
  ["既読スルーの夜に現れる3つの兆し", "返事の有無に飲まれた心を、兆しの見方へ戻します。", "彼の本音", "月・女教皇・水"],
  ["男が距離を置くとき、魂で起きていること", "離れる行動の裏にある防衛、迷い、未整理の気を読みます。", "彼の本音", "隠者・比肩・夜道"],
  ["冷めた彼と、余裕を失った彼の見分け方", "終わりと混乱を取り違えないための静かな視点。", "彼の本音", "節制・正財・薄明"],
  ["返信が遅い彼の心に流れる気", "遅い返信を愛情の量だけで測らない読み解き。", "彼の本音", "水星・偏財・霧"],
  ["会いたいと言わない男の裏側にある感情", "言葉にしない男性心理の奥にある怖さと願いを整えます。", "彼の本音", "杯・正官・青い月"],
  ["優しかった彼が変わった夜の理由", "態度の変化に傷ついた心へ、原因を分けて見る言葉。", "彼の本音", "塔・劫財・欠け月"],
  ["男が追いたくなる“余白の波動”", "追うほど遠ざかる恋に、余白という引力を戻します。", "彼の本音", "星・食神・余白"],
  ["彼が戻る前に現れる小さな前兆", "戻る縁が動く前の、静かな変化を見落とさないために。", "彼の本音", "審判・沐浴・風"],
  ["彼の気持ちを追いすぎない月読の視点", "占いも確認も止まらない夜、心の軸を取り戻します。", "彼の本音", "女教皇・印綬・鏡"],
  ["忘れられない恋に宿る魂の記憶", "忘れられない理由を、未練だけで責めない読み解き。", "復縁と執着", "月・墓・記憶"],
  ["復縁したい夜、最初に整えるべき気", "連絡より前に整えるべき心の温度を見ます。", "復縁と執着", "節制・正財・香"],
  ["悪魔のカードが出る夜、執着は強くなる", "離れたいのに見てしまう苦しさを象徴からほどきます。", "復縁と執着", "悪魔・劫財・鎖"],
  ["執着と愛を分ける月の境界線", "好きだから苦しいのか、不安が握っているのかを分ける夜。", "復縁と執着", "月・正官・境界線"],
  ["元彼のSNSを見たくなる魂の癖", "見た後に傷つくのに開いてしまう衝動を静めます。", "復縁と執着", "剣・偏印・窓"],
  ["復縁前に止めるべき逆流行動", "縁を戻したい時ほど避けたい行動を整理します。", "復縁と執着", "死神・比肩・逆流"],
  ["連絡したい夜に感情を鎮める方法", "送る前の3分で、自分の本音と不安を切り分けます。", "復縁と執着", "節制・印綬・深呼吸"],
  ["手放しとは、彼を忘れることではない", "忘れられない自分を責めず、握り方を変える言葉。", "復縁と執着", "星・墓・手紙"],
  ["再会の縁が残る人に出る兆し", "まだ終わっていない縁が、現実に出す小さなサイン。", "復縁と執着", "審判・沐浴・鈴"],
  ["戻る恋と戻らない恋を分ける運命の線", "復縁を願う夜に、執着と流れの違いを見ます。", "復縁と執着", "運命の輪・正財・金線"],
  ["傷官の星が恋で泣いてしまう理由", "言葉に敏感な星が、恋で深く傷つく仕組み。", "四柱推命", "傷官・月・硝子"],
  ["偏財男性が距離を取りたくなる時", "自由を求める星の男性が離れる瞬間を読みます。", "四柱推命", "偏財・風・杯"],
  ["比肩の星が恋愛中に孤独を選ぶ理由", "一人に戻りたくなる星の防衛反応を知る夜。", "四柱推命", "比肩・隠者・石"],
  ["劫財の愛が執着に変わる瞬間", "強く求める愛が苦しさへ変わる境目を見ます。", "四柱推命", "劫財・悪魔・紅い糸"],
  ["偏印の星が沈黙を深読みする夜", "想像が止まらない星の心を、現実へ戻します。", "四柱推命", "偏印・月・霧"],
  ["正財の星が曖昧な関係に傷つく理由", "確かめたい星が、曖昧さで消耗する理由。", "四柱推命", "正財・女教皇・箱"],
  ["印綬の愛が尽くしすぎてしまう時", "与えすぎる優しさを、自分へ返す夜の読み解き。", "四柱推命", "印綬・星・灯"],
  ["食神の星が“愛されたい”と泣く夜", "素直な愛情欲求を否定しないための言葉。", "四柱推命", "食神・杯・白い花"],
  ["沐浴の星が恋で揺れやすい理由", "惹かれやすく不安定になる星の美しさと注意点。", "四柱推命", "沐浴・月・水面"],
  ["墓の星が過去の恋を抱え続ける理由", "終わった恋を内側にしまい続ける星の記憶。", "四柱推命", "墓・審判・古い鍵"],
  ["月のカードが映す恋愛不安の正体", "見えない不安を、月の象徴から静かにほどきます。", "タロットと夜ワーク", "月・水・影"],
  ["悪魔のカードが示す離れられない執着", "繰り返す確認と苦しさを、悪魔の象徴で見つめます。", "タロットと夜ワーク", "悪魔・鎖・欲"],
  ["審判のカードが告げる再会の合図", "再会の前に起きる内面と現実の呼び戻し。", "タロットと夜ワーク", "審判・鈴・夜明け"],
  ["女教皇のカードが教える直感の読み方", "不安と直感を混同しないための静かな判断軸。", "タロットと夜ワーク", "女教皇・月・書"],
  ["死神のカードが示す終わりと再生の夜", "終わりを罰ではなく、再生の入口として読む夜。", "タロットと夜ワーク", "死神・黒い花・再生"],
  ["星のカードが灯す、まだ消えていない希望", "小さく残る希望を、焦らず守るための言葉。", "タロットと夜ワーク", "星・水瓶・祈り"],
  ["眠れない夜に心を戻す月読ノート", "考えすぎる夜、紙に心を戻す短いワーク。", "タロットと夜ワーク", "月読ノート・印綬・インク"],
  ["追いLINEしたくなった時の3分浄化ワーク", "送信前の衝動を鎮め、自分の尊厳へ戻ります。", "タロットと夜ワーク", "節制・水・白煙"],
  ["彼の反応から魂を切り離す言葉", "彼の反応で一日が決まってしまう心をほどきます。", "タロットと夜ワーク", "剣・女教皇・境界"],
  ["長い夜に読む、月読からの小さな手紙", "どうしても苦しい夜に、自分を責めず眠るための手紙。", "タロットと夜ワーク", "月・星・手紙"]
].map(([title, description, category, symbol], index) => ({
  id: index + 1,
  title,
  description,
  category,
  symbol
}));

function getBonusFromPath(pathname) {
  const match = pathname.match(/^\/bonus\/(\d+)\/?$/);
  if (!match) return null;
  return bonuses.find((bonus) => bonus.id === Number(match[1])) ?? null;
}

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === "true"
  );
  const [path, setPath] = useState(window.location.pathname);
  const [activeCategory, setActiveCategory] = useState("すべて");

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const currentBonus = useMemo(() => getBonusFromPath(path), [path]);

  if (!isAuthenticated) {
    return (
      <Shell>
        <PasswordGate
          onUnlock={() => {
            localStorage.setItem(AUTH_KEY, "true");
            setIsAuthenticated(true);
          }}
        />
      </Shell>
    );
  }

  return (
    <Shell>
      {currentBonus ? (
        <BonusDetail bonus={currentBonus} />
      ) : (
        <VaultHome activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      )}
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <main className="app-shell">
      <div className="moon-glow" aria-hidden="true" />
      <div className="stars" aria-hidden="true" />
      {children}
    </main>
  );
}

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (value.trim() === PASS_PHRASE) {
      setError("");
      onUnlock();
      navigate("/");
      return;
    }
    setError("合言葉が違います。LINEに届いた言葉をもう一度確認してください。");
  }

  return (
    <section className="gate-screen">
      <div className="brand-mark">
        <Moon size={24} />
      </div>
      <p className="eyebrow">tsukuyomi vault</p>
      <h1>月読｜夜の保管庫</h1>
      <p className="lead">
        ここは、誰にも言えない恋を
        <br />
        静かに整理するための保管庫です。
      </p>
      <p className="subtle">LINEで届いた合言葉を入力してください。</p>
      <form className="pass-form" onSubmit={submit}>
        <label>
          <span>合言葉</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="合言葉を入力"
            autoComplete="off"
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">
          <LockKeyhole size={18} />
          保管庫を開く
        </button>
      </form>
    </section>
  );
}

function VaultHome({ activeCategory, onCategoryChange }) {
  const filteredBonuses =
    activeCategory === "すべて"
      ? bonuses
      : bonuses.filter((bonus) => bonus.category === activeCategory);

  return (
    <section className="vault">
      <header className="hero">
        <p className="eyebrow">月読 ─ tsukuyomi ─</p>
        <h1>月読｜夜の保管庫</h1>
        <p>
          誰にも言えない恋を、
          <br />
          ひとりで抱えてきた人へ。
        </p>
        <p>
          ここには、
          <br />
          彼の沈黙、復縁、執着、命式、カードの意味を
          <br />
          静かに整理するための言葉を置いています。
        </p>
        <p>必要な夜に、必要なものだけ読んでください。</p>
      </header>

      <nav className="category-tabs" aria-label="特典カテゴリ">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="bonus-grid">
        {filteredBonuses.map((bonus) => (
          <button className="bonus-card" key={bonus.id} onClick={() => navigate(`/bonus/${bonus.id}`)}>
            <span className="bonus-number">{String(bonus.id).padStart(2, "0")}</span>
            <span className="bonus-category">{bonus.category}</span>
            <strong>{bonus.title}</strong>
            <span className="bonus-description">{bonus.description}</span>
            <span className="bonus-symbol">関連象徴：{bonus.symbol}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function BonusDetail({ bonus }) {
  return (
    <article className="detail">
      <button className="back-button" onClick={() => navigate("/")}>
        <ChevronLeft size={18} />
        保管庫へ戻る
      </button>
      <p className="eyebrow">特典 {String(bonus.id).padStart(2, "0")}</p>
      <h1>{bonus.title}</h1>
      <div className="symbol-line">
        <Sparkles size={16} />
        関連象徴：{bonus.symbol}
      </div>

      <DetailSection title="今夜の読み解き">
        {bonus.title}は、今の苦しさを「彼の答え」だけで決めつけないための鍵です。{bonus.symbol}
        の象徴は、見えない部分に心を奪われた時ほど、静かに現実へ戻ることを教えます。彼の沈黙や反応の薄さは、愛が消えた証拠とは限りません。迷い、疲れ、防衛、未整理の感情が重なっている夜もあります。
      </DetailSection>
      <DetailSection title="苦しくなる理由">
        苦しくなるのは、あなたが弱いからではありません。大切にした恋ほど、少しの変化を命式の星やカードの影のように敏感に拾います。特に{bonus.category}
        のテーマでは、不安が先に走ると「確認したい」「追いかけたい」という気が強くなります。心は答えを求めていますが、本当は安心できる場所を探しています。
      </DetailSection>
      <DetailSection title="今やめた方がいいこと">
        今夜は、彼の反応を何度も見に行くこと、SNSで答えを探すこと、勢いで長い文章を送ることを少し止めてください。行動する前に、胸の奥にある「怖い」「置いていかれた気がする」という声を一度だけ言葉にします。恋を動かす前に、自分の気を整えることが先です。
      </DetailSection>
      <DetailSection title="心を戻す小さなワーク">
        紙かメモに「今、私が本当に怖いこと」を三行だけ書いてください。次に「今夜しなくてもいいこと」を一つ決めます。最後に深く息を吐き、月の光を胸に置くように目を閉じます。答えを急がない静けさが、あなたの魅力と判断力を戻してくれます。
      </DetailSection>
      <DetailSection title="月読メッセージ">
        あなたの恋は、誰かに笑われるためのものではありません。苦しい夜があっても、それは愛する力が壊れている証拠ではなく、心が丁寧に扱われたいと知らせているだけです。月読は、急がせません。今夜は彼を追うより、あなた自身を夜の中心へ戻してあげてください。
      </DetailSection>

      <div className="cta-stack">
        <CtaCard
          title="静かに話せる場所へ"
          body="誰にも言えない恋を、ひとりで抱えなくていい。今の彼の気持ち、関係の流れ、あなたの命式から見える恋愛傾向を、静かに整理します。"
          button="静かに話せる場所へ"
          href="https://lin.ee/tzVCsKH"
        />
        <CtaCard
          title="恋愛命式16タイプ診断"
          body="自分の恋愛命式をまだ見ていない人は、まず診断から静かに見てください。"
          button="診断へ戻る"
          href="https://uranai-three.vercel.app"
        />
      </div>
    </article>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}

function CtaCard({ title, body, button, href }) {
  return (
    <section className="cta-card">
      <h2>{title}</h2>
      <p>{body}</p>
      <a href={href} target="_blank" rel="noreferrer">
        {button}
      </a>
    </section>
  );
}

export default App;
