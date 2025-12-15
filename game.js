// --- 1. 3Dシーンの初期化 (Three.js) ---
let scene, camera, renderer, cube;

function initThreeJS() {
    const container = document.getElementById('game-container');

    // シーンの作成
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111133); // 濃い青

    // カメラの設定 (視野角, アスペクト比, near, far)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // レンダラー（描画エンジン）の設定
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 立方体（Cube）の作成
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffff }); // 水色の光沢
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 光源の追加
    const ambientLight = new THREE.AmbientLight(0x404040, 5); // 弱い全体光
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 太陽光
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    // アニメーションループを開始
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // 立方体を回転させる（アニメーション）
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// --- 2. 問題データベース ---

// 算数の問題データ（step1-10）
const mathQuestions = {
    1: [
        { q: "2兆を漢字で正しく表しているのはどれですか？", options: ["二兆", "二兆円", "二丁", "二超"], answer: "二兆" },
        { q: "35億を100倍するといくつですか？", options: ["350億", "3500億", "3兆5000億", "35億100"], answer: "3500億" },
        { q: "「5009億700万」を数字で書きなさい。", options: ["500970000000", "500907000000", "500097000000", "5009700000"], answer: "500907000000" },
        { q: "100億を30個集めた数はいくつですか？", options: ["3000億", "30億", "30兆", "3兆"], answer: "3000億" },
        { q: "400億から90億を引くといくつですか？", options: ["30億", "310億", "31億", "490億"], answer: "310億" },
        { q: "「7兆5000億」は「7500億」の何倍ですか？", options: ["10倍", "100倍", "1000倍", "50倍"], answer: "10倍" },
        { q: "9999億9999万9999 の次の数は？", options: ["10000億", "1兆", "10兆", "10億"], answer: "1兆" },
        { q: "500億を10で割った数はいくつですか？", options: ["50億", "5億", "500万", "5000万"], answer: "50億" },
        { q: "8兆900万と8009億では、どちらが大きいですか？", options: ["8兆900万", "8009億", "同じ大きさ", "比べられない"], answer: "8兆900万" },
        { q: "「320兆」を数字で正しく書きなさい。", options: ["320000000000000", "32000000000000", "3200000000000", "3200000000000000"], answer: "320000000000000" }
    ],
    2: [
        { q: "124 × 3 の答えは？", options: ["362", "372", "382", "392"], answer: "372" },
        { q: "567 ÷ 9 の答えは？", options: ["61", "63", "65", "67"], answer: "63" },
        { q: "45 + 78 の答えは？", options: ["121", "123", "125", "127"], answer: "123" },
        { q: "234 - 156 の答えは？", options: ["76", "78", "80", "82"], answer: "78" },
        { q: "6 × 7 × 2 の答えは？", options: ["82", "84", "86", "88"], answer: "84" },
        { q: "144 ÷ 12 の答えは？", options: ["10", "11", "12", "13"], answer: "12" },
        { q: "89 + 67 の答えは？", options: ["154", "156", "158", "160"], answer: "156" },
        { q: "200 - 145 の答えは？", options: ["53", "55", "57", "59"], answer: "55" },
        { q: "8 × 9 の答えは？", options: ["70", "72", "74", "76"], answer: "72" },
        { q: "168 ÷ 7 の答えは？", options: ["22", "24", "26", "28"], answer: "24" }
    ],
    3: [
        { q: "時計の長針が12を、短針が3を指している時は何時ですか？", options: ["3時", "12時", "3時0分", "0時3分"], answer: "3時0分" },
        { q: "1時間30分は何分ですか？", options: ["60分", "90分", "120分", "150分"], answer: "90分" },
        { q: "午後2時15分の30分後は何時何分ですか？", options: ["午後2時45分", "午後3時15分", "午後2時30分", "午後3時45分"], answer: "午後2時45分" },
        { q: "1日は何時間ですか？", options: ["12時間", "24時間", "30時間", "36時間"], answer: "24時間" },
        { q: "15時は午後何時ですか？", options: ["午後1時", "午後2時", "午後3時", "午後4時"], answer: "午後3時" },
        { q: "2時間15分は何分ですか？", options: ["125分", "135分", "145分", "155分"], answer: "135分" },
        { q: "午前9時から午後2時まで何時間ですか？", options: ["4時間", "5時間", "6時間", "7時間"], answer: "5時間" },
        { q: "30分の3倍は何分ですか？", options: ["60分", "90分", "120分", "150分"], answer: "90分" },
        { q: "午後5時30分の1時間30分前は何時何分ですか？", options: ["午後4時", "午後4時30分", "午後3時30分", "午後3時"], answer: "午後4時" },
        { q: "1週間は何日ですか？", options: ["5日", "6日", "7日", "8日"], answer: "7日" }
    ],
    4: [
        { q: "正方形の1辺が5cmのとき、周りの長さは？", options: ["15cm", "20cm", "25cm", "30cm"], answer: "20cm" },
        { q: "長方形の縦が6cm、横が8cmのとき、面積は？", options: ["42cm²", "44cm²", "46cm²", "48cm²"], answer: "48cm²" },
        { q: "1辺が4cmの正方形の面積は？", options: ["12cm²", "14cm²", "16cm²", "18cm²"], answer: "16cm²" },
        { q: "周りの長さが24cmの正方形の1辺の長さは？", options: ["5cm", "6cm", "7cm", "8cm"], answer: "6cm" },
        { q: "面積が36cm²の正方形の1辺の長さは？", options: ["4cm", "5cm", "6cm", "7cm"], answer: "6cm" },
        { q: "長方形の縦が5cm、横が10cmのとき、周りの長さは？", options: ["25cm", "30cm", "35cm", "40cm"], answer: "30cm" },
        { q: "1辺が7cmの正方形の周りの長さは？", options: ["21cm", "24cm", "28cm", "32cm"], answer: "28cm" },
        { q: "面積が20cm²、縦が4cmの長方形の横の長さは？", options: ["4cm", "5cm", "6cm", "7cm"], answer: "5cm" },
        { q: "周りの長さが30cm、縦が7cmの長方形の横の長さは？", options: ["6cm", "7cm", "8cm", "9cm"], answer: "8cm" },
        { q: "1辺が9cmの正方形の面積は？", options: ["72cm²", "81cm²", "90cm²", "99cm²"], answer: "81cm²" }
    ],
    5: [
        { q: "小数 0.5 を分数で表すと？", options: ["1/2", "1/4", "1/5", "1/10"], answer: "1/2" },
        { q: "0.3 + 0.4 の答えは？", options: ["0.6", "0.7", "0.8", "0.9"], answer: "0.7" },
        { q: "0.8 - 0.3 の答えは？", options: ["0.4", "0.5", "0.6", "0.7"], answer: "0.5" },
        { q: "小数 0.25 を分数で表すと？", options: ["1/2", "1/3", "1/4", "1/5"], answer: "1/4" },
        { q: "0.6 × 2 の答えは？", options: ["1.0", "1.2", "1.4", "1.6"], answer: "1.2" },
        { q: "0.9 ÷ 3 の答えは？", options: ["0.2", "0.3", "0.4", "0.5"], answer: "0.3" },
        { q: "1.5 + 0.7 の答えは？", options: ["2.1", "2.2", "2.3", "2.4"], answer: "2.2" },
        { q: "2.4 - 1.8 の答えは？", options: ["0.5", "0.6", "0.7", "0.8"], answer: "0.6" },
        { q: "0.4 × 5 の答えは？", options: ["1.5", "2.0", "2.5", "3.0"], answer: "2.0" },
        { q: "1.8 ÷ 2 の答えは？", options: ["0.7", "0.8", "0.9", "1.0"], answer: "0.9" }
    ],
    6: [
        { q: "分数 1/2 + 1/4 の答えは？", options: ["1/4", "2/4", "3/4", "4/4"], answer: "3/4" },
        { q: "1/3 + 1/3 の答えは？", options: ["1/6", "2/3", "3/3", "2/6"], answer: "2/3" },
        { q: "3/4 - 1/4 の答えは？", options: ["1/4", "2/4", "1/2", "3/4"], answer: "1/2" },
        { q: "1/2 × 2 の答えは？", options: ["1/2", "1", "2/2", "2/4"], answer: "1" },
        { q: "2/3 - 1/3 の答えは？", options: ["1/6", "1/3", "2/6", "3/6"], answer: "1/3" },
        { q: "1/4 + 2/4 の答えは？", options: ["2/4", "3/4", "4/4", "1/2"], answer: "3/4" },
        { q: "1/2 ÷ 2 の答えは？", options: ["1/4", "1/2", "2/4", "1"], answer: "1/4" },
        { q: "3/5 - 1/5 の答えは？", options: ["1/5", "2/5", "3/5", "4/5"], answer: "2/5" },
        { q: "1/3 × 3 の答えは？", options: ["1/3", "2/3", "1", "3/3"], answer: "1" },
        { q: "4/5 - 2/5 の答えは？", options: ["1/5", "2/5", "3/5", "4/5"], answer: "2/5" }
    ],
    7: [
        { q: "1000円の30%はいくらですか？", options: ["200円", "300円", "400円", "500円"], answer: "300円" },
        { q: "50個の20%はいくつですか？", options: ["8個", "10個", "12個", "15個"], answer: "10個" },
        { q: "200cmの25%は何cmですか？", options: ["40cm", "50cm", "60cm", "70cm"], answer: "50cm" },
        { q: "80の50%は？", options: ["35", "40", "45", "50"], answer: "40" },
        { q: "120円の10%はいくらですか？", options: ["10円", "12円", "15円", "20円"], answer: "12円" },
        { q: "60の75%は？", options: ["40", "45", "50", "55"], answer: "45" },
        { q: "400gの15%は何gですか？", options: ["50g", "60g", "70g", "80g"], answer: "60g" },
        { q: "90の40%は？", options: ["32", "34", "36", "38"], answer: "36" },
        { q: "1500円の20%はいくらですか？", options: ["200円", "300円", "400円", "500円"], answer: "300円" },
        { q: "200の80%は？", options: ["150", "160", "170", "180"], answer: "160" }
    ],
    8: [
        { q: "平行四辺形の底辺が8cm、高さが5cmのとき、面積は？", options: ["35cm²", "40cm²", "45cm²", "50cm²"], answer: "40cm²" },
        { q: "三角形の底辺が6cm、高さが4cmのとき、面積は？", options: ["10cm²", "12cm²", "14cm²", "16cm²"], answer: "12cm²" },
        { q: "台形の上底が3cm、下底が7cm、高さが4cmのとき、面積は？", options: ["18cm²", "20cm²", "22cm²", "24cm²"], answer: "20cm²" },
        { q: "底辺が10cm、高さが6cmの三角形の面積は？", options: ["28cm²", "30cm²", "32cm²", "34cm²"], answer: "30cm²" },
        { q: "平行四辺形の底辺が12cm、高さが5cmのとき、面積は？", options: ["55cm²", "60cm²", "65cm²", "70cm²"], answer: "60cm²" },
        { q: "台形の上底が4cm、下底が8cm、高さが5cmのとき、面積は？", options: ["28cm²", "30cm²", "32cm²", "34cm²"], answer: "30cm²" },
        { q: "底辺が9cm、高さが7cmの三角形の面積は？", options: ["30.5cm²", "31.5cm²", "32.5cm²", "33.5cm²"], answer: "31.5cm²" },
        { q: "平行四辺形の底辺が15cm、高さが4cmのとき、面積は？", options: ["58cm²", "60cm²", "62cm²", "64cm²"], answer: "60cm²" },
        { q: "台形の上底が5cm、下底が11cm、高さが6cmのとき、面積は？", options: ["46cm²", "48cm²", "50cm²", "52cm²"], answer: "48cm²" },
        { q: "底辺が8cm、高さが5cmの三角形の面積は？", options: ["18cm²", "20cm²", "22cm²", "24cm²"], answer: "20cm²" }
    ],
    9: [
        { q: "1リットルは何ミリリットルですか？", options: ["100ml", "500ml", "1000ml", "2000ml"], answer: "1000ml" },
        { q: "500ml + 300ml は何リットルですか？", options: ["0.6L", "0.7L", "0.8L", "0.9L"], answer: "0.8L" },
        { q: "2リットルは何ミリリットルですか？", options: ["1500ml", "2000ml", "2500ml", "3000ml"], answer: "2000ml" },
        { q: "1.5リットルは何ミリリットルですか？", options: ["1000ml", "1500ml", "2000ml", "2500ml"], answer: "1500ml" },
        { q: "2500mlは何リットルですか？", options: ["2L", "2.5L", "3L", "3.5L"], answer: "2.5L" },
        { q: "3リットル - 800ml は何リットルですか？", options: ["2L", "2.2L", "2.5L", "2.8L"], answer: "2.2L" },
        { q: "1000ml ÷ 2 は何リットルですか？", options: ["0.4L", "0.5L", "0.6L", "0.7L"], answer: "0.5L" },
        { q: "0.8リットルは何ミリリットルですか？", options: ["600ml", "700ml", "800ml", "900ml"], answer: "800ml" },
        { q: "4500mlは何リットルですか？", options: ["4L", "4.5L", "5L", "5.5L"], answer: "4.5L" },
        { q: "1.2リットル + 0.8リットル は？", options: ["1.8L", "2L", "2.2L", "2.5L"], answer: "2L" }
    ],
    10: [
        { q: "1kgは何gですか？", options: ["500g", "1000g", "1500g", "2000g"], answer: "1000g" },
        { q: "2500gは何kgですか？", options: ["2kg", "2.5kg", "3kg", "3.5kg"], answer: "2.5kg" },
        { q: "3kg + 500g は何kgですか？", options: ["3.3kg", "3.5kg", "3.8kg", "4kg"], answer: "3.5kg" },
        { q: "1.5kgは何gですか？", options: ["1000g", "1500g", "2000g", "2500g"], answer: "1500g" },
        { q: "4500gは何kgですか？", options: ["4kg", "4.5kg", "5kg", "5.5kg"], answer: "4.5kg" },
        { q: "2kg - 800g は何kgですか？", options: ["1kg", "1.2kg", "1.5kg", "1.8kg"], answer: "1.2kg" },
        { q: "500g × 4 は何kgですか？", options: ["1.5kg", "2kg", "2.5kg", "3kg"], answer: "2kg" },
        { q: "0.8kgは何gですか？", options: ["600g", "700g", "800g", "900g"], answer: "800g" },
        { q: "3.5kgは何gですか？", options: ["3000g", "3500g", "4000g", "4500g"], answer: "3500g" },
        { q: "1kg200gは何gですか？", options: ["1100g", "1200g", "1300g", "1400g"], answer: "1200g" }
    ]
};

// 国语の問題データ（step1-10）
const languageQuestions = {
    1: [
        { q: "「学校」の読み方は？", options: ["がっこう", "がっこ", "がっこうう", "がっこお"], answer: "がっこう" },
        { q: "「川」の漢字の読み方は？", options: ["やま", "かわ", "うみ", "みず"], answer: "かわ" },
        { q: "「元気」の読み方は？", options: ["げんき", "げんきい", "げんきー", "げんっき"], answer: "げんき" },
        { q: "「花」の漢字の読み方は？", options: ["はな", "はね", "はる", "はく"], answer: "はな" },
        { q: "「朝」の読み方は？", options: ["あさ", "あし", "あす", "あせ"], answer: "あさ" },
        { q: "「友だち」の読み方は？", options: ["ともだち", "ともたち", "ともだちい", "ともだちー"], answer: "ともだち" },
        { q: "「空」の漢字の読み方は？", options: ["くう", "そら", "あお", "うみ"], answer: "そら" },
        { q: "「楽しい」の読み方は？", options: ["たのしい", "たのし", "たのしー", "たのしーい"], answer: "たのしい" },
        { q: "「海」の漢字の読み方は？", options: ["うみ", "かわ", "やま", "そら"], answer: "うみ" },
        { q: "「時間」の読み方は？", options: ["じかん", "じっかん", "じかんん", "じーかん"], answer: "じかん" }
    ],
    2: [
        { q: "「走る」の読み方は？", options: ["はしる", "はいる", "はえる", "はるる"], answer: "はしる" },
        { q: "「読む」の読み方は？", options: ["よむ", "よぶ", "よる", "よおむ"], answer: "よむ" },
        { q: "「書く」の読み方は？", options: ["かく", "かける", "かかる", "かこく"], answer: "かく" },
        { q: "「見る」の読み方は？", options: ["みる", "みえる", "みつ", "みーる"], answer: "みる" },
        { q: "「聞く」の読み方は？", options: ["きく", "きこえる", "きつ", "きーく"], answer: "きく" },
        { q: "「食べる」の読み方は？", options: ["たべる", "たぶる", "たべ", "たべーる"], answer: "たべる" },
        { q: "「遊ぶ」の読み方は？", options: ["あそぶ", "あそぶる", "あそ", "あそーぶ"], answer: "あそぶ" },
        { q: "「学ぶ」の読み方は？", options: ["まなぶ", "まねぶ", "まな", "まなーぶ"], answer: "まなぶ" },
        { q: "「話す」の読み方は？", options: ["はなす", "はなつ", "はな", "はなーす"], answer: "はなす" },
        { q: "「行く」の読み方は？", options: ["いく", "いきる", "い", "いーく"], answer: "いく" }
    ],
    3: [
        { q: "「大きい」の対義語は？", options: ["小さい", "長い", "高い", "広い"], answer: "小さい" },
        { q: "「高い」の対義語は？", options: ["低い", "深い", "浅い", "軽い"], answer: "低い" },
        { q: "「長い」の対義語は？", options: ["短い", "小さい", "細い", "薄い"], answer: "短い" },
        { q: "「明るい」の対義語は？", options: ["暗い", "黒い", "濃い", "重い"], answer: "暗い" },
        { q: "「暑い」の対義語は？", options: ["寒い", "冷たい", "涼しい", "温かい"], answer: "寒い" },
        { q: "「重い」の対義語は？", options: ["軽い", "小さい", "薄い", "細い"], answer: "軽い" },
        { q: "「広い」の対義語は？", options: ["狭い", "小さい", "短い", "浅い"], answer: "狭い" },
        { q: "「深い」の対義語は？", options: ["浅い", "低い", "薄い", "軽い"], answer: "浅い" },
        { q: "「新しい」の対義語は？", options: ["古い", "汚い", "悪い", "暗い"], answer: "古い" },
        { q: "「強い」の対義語は？", options: ["弱い", "小さい", "細い", "薄い"], answer: "弱い" }
    ],
    4: [
        { q: "「山」の漢字はどれですか？", options: ["山", "川", "田", "火"], answer: "山" },
        { q: "「川」の漢字はどれですか？", options: ["川", "山", "水", "海"], answer: "川" },
        { q: "「花」の漢字はどれですか？", options: ["花", "草", "木", "葉"], answer: "花" },
        { q: "「鳥」の漢字はどれですか？", options: ["鳥", "魚", "虫", "犬"], answer: "鳥" },
        { q: "「木」の漢字はどれですか？", options: ["木", "林", "森", "草"], answer: "木" },
        { q: "「月」の漢字はどれですか？", options: ["月", "日", "星", "光"], answer: "月" },
        { q: "「水」の漢字はどれですか？", options: ["水", "川", "海", "池"], answer: "水" },
        { q: "「火」の漢字はどれですか？", options: ["火", "水", "土", "風"], answer: "火" },
        { q: "「土」の漢字はどれですか？", options: ["土", "石", "山", "田"], answer: "土" },
        { q: "「田」の漢字はどれですか？", options: ["田", "土", "地", "畑"], answer: "田" }
    ],
    5: [
        { q: "「本を読む」の「を」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「学校へ行く」の「へ」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「友だちと遊ぶ」の「と」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「公園で走る」の「で」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「先生に聞く」の「に」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「家から出る」の「から」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「学校まで歩く」の「まで」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「お母さんと買い物をする」の「と」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「図書館で勉強する」の「で」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" },
        { q: "「友だちと話す」の「と」の使い方は正しいですか？", options: ["正しい", "間違い", "どちらでも", "わからない"], answer: "正しい" }
    ],
    6: [
        { q: "「あした、公園に行きます。」の「あした」を漢字で書くと？", options: ["明日", "明後日", "今日", "昨日"], answer: "明日" },
        { q: "「きのう、本を読みました。」の「きのう」を漢字で書くと？", options: ["昨日", "今日", "明日", "明後日"], answer: "昨日" },
        { q: "「きょうは晴れです。」の「きょう」を漢字で書くと？", options: ["今日", "明日", "昨日", "今朝"], answer: "今日" },
        { q: "「おととい雨が降りました。」の「おととい」を漢字で書くと？", options: ["一昨日", "昨日", "今日", "明日"], answer: "一昨日" },
        { q: "「あさって、遠足があります。」の「あさって」を漢字で書くと？", options: ["明後日", "明日", "今日", "昨日"], answer: "明後日" },
        { q: "「けさ、早く起きました。」の「けさ」を漢字で書くと？", options: ["今朝", "今晩", "今日", "今"], answer: "今朝" },
        { q: "「こんや、星が見えます。」の「こんや」を漢字で書くと？", options: ["今夜", "今朝", "今日", "今"], answer: "今夜" },
        { q: "「らいしゅう、テストがあります。」の「らいしゅう」を漢字で書くと？", options: ["来週", "今週", "先週", "来月"], answer: "来週" },
        { q: "「せんしゅう、運動会がありました。」の「せんしゅう」を漢字で書くと？", options: ["先週", "今週", "来週", "先月"], answer: "先週" },
        { q: "「こんげつ、新しいクラスが始まります。」の「こんげつ」を漢字で書くと？", options: ["今月", "来月", "先月", "今日"], answer: "今月" }
    ],
    7: [
        { q: "「こども」を漢字で書くと？", options: ["子供", "子ども", "子共", "子供"], answer: "子供" },
        { q: "「ともだち」を漢字で書くと？", options: ["友達", "友だち", "友達ち", "ともだち"], answer: "友達" },
        { q: "「はは」を漢字で書くと？", options: ["母", "父", "お母さん", "お父さん"], answer: "母" },
        { q: "「ちち」を漢字で書くと？", options: ["父", "母", "お父さん", "お母さん"], answer: "父" },
        { q: "「あね」を漢字で書くと？", options: ["姉", "妹", "兄", "弟"], answer: "姉" },
        { q: "「おとうと」を漢字で書くと？", options: ["弟", "兄", "姉", "妹"], answer: "弟" },
        { q: "「いもうと」を漢字で書くと？", options: ["妹", "姉", "兄", "弟"], answer: "妹" },
        { q: "「あに」を漢字で書くと？", options: ["兄", "弟", "姉", "妹"], answer: "兄" },
        { q: "「せんせい」を漢字で書くと？", options: ["先生", "先制", "先生い", "せんせい"], answer: "先生" },
        { q: "「がくせい」を漢字で書くと？", options: ["学生", "学制", "学生い", "がくせい"], answer: "学生" }
    ],
    8: [
        { q: "「みどり」を漢字で書くと？", options: ["緑", "青", "赤", "黄"], answer: "緑" },
        { q: "「あお」を漢字で書くと？", options: ["青", "緑", "藍", "蒼"], answer: "青" },
        { q: "「あか」を漢字で書くと？", options: ["赤", "紅", "朱", "緋"], answer: "赤" },
        { q: "「きいろ」を漢字で書くと？", options: ["黄色", "黄", "黄色い", "きいろ"], answer: "黄色" },
        { q: "「くろ」を漢字で書くと？", options: ["黒", "暗", "墨", "漆"], answer: "黒" },
        { q: "「しろ」を漢字で書くと？", options: ["白", "明", "清", "潔"], answer: "白" },
        { q: "「むらさき」を漢字で書くと？", options: ["紫", "青", "藍", "藍紫"], answer: "紫" },
        { q: "「ちゃいろ」を漢字で書くと？", options: ["茶色", "茶", "褐色", "ちゃいろ"], answer: "茶色" },
        { q: "「だいだい」を漢字で書くと？", options: ["橙色", "橙", "オレンジ", "だいだい"], answer: "橙色" },
        { q: "「ピンク」を漢字で書くと？", options: ["桃色", "桃", "ピンク", "薄紅色"], answer: "桃色" }
    ],
    9: [
        { q: "「きれい」という言葉の意味は？", options: ["美しい", "汚い", "大きい", "小さい"], answer: "美しい" },
        { q: "「ゆうめい」を漢字で書くと？", options: ["有名", "勇名", "由名", "優名"], answer: "有名" },
        { q: "「じょうぶ」を漢字で書くと？", options: ["丈夫", "強部", "常部", "上歩"], answer: "丈夫" },
        { q: "「しずか」を漢字で書くと？", options: ["静か", "鎮か", "沈か", "止か"], answer: "静か" },
        { q: "「べんり」を漢字で書くと？", options: ["便利", "便理", "辺利", "便利"], answer: "便利" },
        { q: "「げんき」を漢字で書くと？", options: ["元気", "原気", "現気", "減気"], answer: "元気" },
        { q: "「あんぜん」を漢字で書くと？", options: ["安全", "案全", "安善", "案善"], answer: "安全" },
        { q: "「きけん」を漢字で書くと？", options: ["危険", "機嫌", "帰県", "気軒"], answer: "危険" },
        { q: "「きもち」を漢字で書くと？", options: ["気持ち", "気持", "木持", "機持"], answer: "気持ち" },
        { q: "「きぶん」を漢字で書くと？", options: ["気分", "気憤", "記分", "機分"], answer: "気分" }
    ],
    10: [
        { q: "「読書」の読み方は？", options: ["どくしょ", "とくしょ", "どくか", "とくか"], answer: "どくしょ" },
        { q: "「勉強」の読み方は？", options: ["べんきょう", "べんきょ", "べんきょお", "べんきょー"], answer: "べんきょう" },
        { q: "「運動」の読み方は？", options: ["うんどう", "うんど", "うんどうう", "うんどー"], answer: "うんどう" },
        { q: "「練習」の読み方は？", options: ["れんしゅう", "れんしゅ", "れんしゅうう", "れんしゅー"], answer: "れんしゅう" },
        { q: "「準備」の読み方は？", options: ["じゅんび", "じゅんびい", "じゅんびー", "じゅんぴ"], answer: "じゅんび" },
        { q: "「整理」の読み方は？", options: ["せいり", "せいりい", "せいりー", "せり"], answer: "せいり" },
        { q: "「発表」の読み方は？", options: ["はっぴょう", "はっぴょ", "はっぴょお", "はっぴょー"], answer: "はっぴょう" },
        { q: "「調査」の読み方は？", options: ["ちょうさ", "ちょうしゃ", "ちょさ", "ちょうさー"], answer: "ちょうさ" },
        { q: "「研究」の読み方は？", options: ["けんきゅう", "けんきゅ", "けんきゅうう", "けんきゅー"], answer: "けんきゅう" },
        { q: "「実験」の読み方は？", options: ["じっけん", "じけん", "じっけんん", "じーけん"], answer: "じっけん" }
    ]
};

// --- 3. ゲーム状態管理 ---
let currentSubject = null; // 'math' または 'language'
let currentStep = 1;
let currentQuestionIndex = 0;
let correctCount = 0;
let questionOrder = [];
let wrongAnswers = []; // 間違えた問題を記録

// --- 4. 記録機能（LocalStorage） ---
function saveRecord(subject, step, score, totalQuestions, wrongAnswers) {
    const records = getRecords();
    const record = {
        id: Date.now(),
        subject: subject,
        step: step,
        score: score,
        totalQuestions: totalQuestions,
        wrongAnswers: wrongAnswers,
        timestamp: new Date().toLocaleString('zh-CN')
    };
    records.push(record);
    localStorage.setItem('gameRecords', JSON.stringify(records));
}

function getRecords() {
    const records = localStorage.getItem('gameRecords');
    return records ? JSON.parse(records) : [];
}

function clearRecords() {
    localStorage.removeItem('gameRecords');
}

// --- 5. DOM要素の取得 ---
const questionText = document.getElementById('question-text');
const answerOptionsDiv = document.getElementById('answer-options');
const scoreDisplay = document.getElementById('score-display');
const feedbackArea = document.getElementById('feedback-area');
const feedbackText = document.getElementById('feedback-text');
const nextButton = document.getElementById('next-button');
const resultArea = document.getElementById('result-area');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-button');
const backToMenuButton = document.getElementById('back-to-menu-button');
const questionArea = document.getElementById('question-area');
const stepTitle = document.getElementById('step-title');
const subjectSelectionArea = document.getElementById('subject-selection-area');
const mathButton = document.getElementById('math-button');
const languageButton = document.getElementById('language-button');
const viewHistoryButton = document.getElementById('view-history-button');
const historyArea = document.getElementById('history-area');
const historyList = document.getElementById('history-list');
const closeHistoryButton = document.getElementById('close-history-button');

// --- 6. 科目選択 ---
mathButton.onclick = () => {
    currentSubject = 'math';
    subjectSelectionArea.classList.add('hidden');
    startGame();
};

languageButton.onclick = () => {
    currentSubject = 'language';
    subjectSelectionArea.classList.add('hidden');
    startGame();
};

// --- 7. ゲーム開始 ---
function startGame() {
    const questions = currentSubject === 'math' ? mathQuestions[currentStep] : languageQuestions[currentStep];
    
    if (!questions) {
        // 全ステップ完了
        showCompletionMessage();
        return;
    }

    questionOrder = Array.from({ length: questions.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongAnswers = [];
    
    const subjectName = currentSubject === 'math' ? '算数' : '国语';
    scoreDisplay.textContent = `正解数: ${correctCount} / ${questions.length}`;
    stepTitle.textContent = `🌟 ${subjectName} ステップ ${currentStep} 🌟`;

    resultArea.classList.add('hidden');
    feedbackArea.classList.add('hidden');
    questionArea.classList.remove('hidden');

    showQuestion();
}

// --- 8. 問題表示 ---
function showQuestion() {
    const questions = currentSubject === 'math' ? mathQuestions[currentStep] : languageQuestions[currentStep];
    
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const qIndex = questionOrder[currentQuestionIndex];
    const qData = questions[qIndex];

    questionText.textContent = `第${currentQuestionIndex + 1}問: ${qData.q}`;
    answerOptionsDiv.innerHTML = '';
    feedbackArea.classList.add('hidden');

    const shuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, qData.answer, qData);
        answerOptionsDiv.appendChild(button);
    });
}

// --- 9. 解答チェック ---
function checkAnswer(selectedOption, correctAnswer, qData) {
    Array.from(answerOptionsDiv.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === selectedOption) {
            button.style.backgroundColor = (selectedOption === correctAnswer) ? '#00cc00' : '#cc0000';
        } else if (button.textContent === correctAnswer) {
            button.style.backgroundColor = '#00cc00';
        }
    });

    if (selectedOption === correctAnswer) {
        correctCount++;
        feedbackText.textContent = "⭕ 正解！素晴らしい！";
    } else {
        feedbackText.textContent = "❌ 不正解... もう一度復習しよう！";
        // 間違えた問題を記録
        wrongAnswers.push({
            question: qData.q,
            selectedAnswer: selectedOption,
            correctAnswer: correctAnswer
        });
    }

    const questions = currentSubject === 'math' ? mathQuestions[currentStep] : languageQuestions[currentStep];
    scoreDisplay.textContent = `正解数: ${correctCount} / ${questions.length}`;
    feedbackArea.classList.remove('hidden');
}

// --- 10. 次へボタン ---
nextButton.onclick = () => {
    currentQuestionIndex++;
    showQuestion();
};

// --- 11. 結果表示 ---
function showResults() {
    questionArea.classList.add('hidden');
    feedbackArea.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const questions = currentSubject === 'math' ? mathQuestions[currentStep] : languageQuestions[currentStep];
    const subjectName = currentSubject === 'math' ? '算数' : '国语';
    
    finalScore.textContent = `最終正解数: ${correctCount} / ${questions.length}`;

    // 記録を保存
    saveRecord(currentSubject, currentStep, correctCount, questions.length, wrongAnswers);

    if (correctCount >= Math.ceil(questions.length * 0.6)) { // 60%以上で合格
        if (currentStep >= 10) {
            // 全ステップ完了
            showCompletionMessage();
            return;
        }
        resultMessage.textContent = "🎉 合格！次のステップに挑戦できます！";
        restartButton.textContent = `ステップ${currentStep + 1}へ進む`;
        restartButton.onclick = () => {
            currentStep++;
            startGame();
        };
        backToMenuButton.classList.remove('hidden');
    } else {
        resultMessage.textContent = `😢 残念ながら不合格です。もう一度ステップ${currentStep}に挑戦しましょう。`;
        restartButton.textContent = `ステップ${currentStep}に再挑戦`;
        restartButton.onclick = () => {
            startGame();
        };
        backToMenuButton.classList.remove('hidden');
    }
    
    backToMenuButton.onclick = () => {
        resetToMenu();
    };
}

function showCompletionMessage() {
    questionArea.classList.add('hidden');
    feedbackArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    
    const subjectName = currentSubject === 'math' ? '算数' : '国语';
    finalScore.textContent = "🎊 おめでとうございます！";
    resultMessage.textContent = `${subjectName}の全ステップをクリアしました！`;
    restartButton.textContent = "メニューに戻る";
    restartButton.onclick = () => {
        resetToMenu();
    };
    backToMenuButton.classList.add('hidden');
}

function resetToMenu() {
    currentStep = 1;
    currentSubject = null;
    resultArea.classList.add('hidden');
    questionArea.classList.add('hidden');
    feedbackArea.classList.add('hidden');
    subjectSelectionArea.classList.remove('hidden');
}

// --- 12. 履歴表示 ---
viewHistoryButton.onclick = () => {
    displayHistory();
};

closeHistoryButton.onclick = () => {
    historyArea.classList.add('hidden');
    subjectSelectionArea.classList.remove('hidden');
};

function displayHistory() {
    const records = getRecords();
    historyList.innerHTML = '';

    if (records.length === 0) {
        historyList.innerHTML = '<p>まだ記録がありません。</p>';
    } else {
        records.reverse().forEach(record => {
            const recordDiv = document.createElement('div');
            recordDiv.className = 'history-record';
            const subjectName = record.subject === 'math' ? '算数' : '国语';
            const wrongAnswersHtml = record.wrongAnswers.length > 0 
                ? `<div class="wrong-answers"><strong>間違えた問題:</strong><ul>${record.wrongAnswers.map(wa => 
                    `<li>問題: ${wa.question}<br>選択: ${wa.selectedAnswer}<br>正解: ${wa.correctAnswer}</li>`
                ).join('')}</ul></div>`
                : '<p>全問正解！</p>';
            
            recordDiv.innerHTML = `
                <h3>${subjectName} ステップ${record.step}</h3>
                <p><strong>得点:</strong> ${record.score} / ${record.totalQuestions}</p>
                <p><strong>時間:</strong> ${record.timestamp}</p>
                ${wrongAnswersHtml}
            `;
            historyList.appendChild(recordDiv);
        });
    }

    subjectSelectionArea.classList.add('hidden');
    historyArea.classList.remove('hidden');
}

// --- 13. ゲーム初期化 ---
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    // 初期画面は科目選択画面
    questionArea.classList.add('hidden');
    resultArea.classList.add('hidden');
    feedbackArea.classList.add('hidden');
    historyArea.classList.add('hidden');
    subjectSelectionArea.classList.remove('hidden');
});