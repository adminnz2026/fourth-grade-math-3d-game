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

    // 立方体（Cube）の作成 (大きな数を表現するオブジェクトの例)
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

// ウィンドウサイズ変更時のリサイズ処理

// ゲーム開始！
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    startGame();

    // 【✅ ここを追加/修正します】
    // 「次のステップへ挑戦」または「再挑戦」ボタンにイベントリスナーを設定
    restartButton.onclick = () => {
        startGame(); // クリックされたら、ゲームを初期状態に戻して開始
    };
});

// --- 2. ゲームロジック ---

// ステップ1のランダム問題データ（4択）
const questions = [
    { q: "2兆を漢字で正しく表しているのはどれですか？",
      options: ["二兆", "二兆円", "二丁", "二超"],
      answer: "二兆" },
    { q: "35億を100倍するといくつですか？",
      options: ["350億", "3500億", "3兆5000億", "35億100"],
      answer: "3500億" },
    { q: "「5009億700万」を数字で書きなさい。",
      options: ["500970000000", "500907000000", "500097000000", "5009700000"],
      answer: "500907000000" },
    { q: "100億を30個集めた数はいくつですか？",
      options: ["3000億", "30億", "30兆", "3兆"],
      answer: "3000億" },
    // ランダム出題のため、合計10問になるようデータを追加してください
    { q: "400億から90億を引くといくつですか？",
      options: ["30億", "310億", "31億", "490億"],
      answer: "310億" },
    { q: "「7兆5000億」は「7500億」の何倍ですか？",
      options: ["10倍", "100倍", "1000倍", "50倍"],
      answer: "10倍" },
    { q: "9999億9999万9999 の次の数は？",
      options: ["10000億", "1兆", "10兆", "10億"],
      answer: "1兆" },
    { q: "500億を10で割った数はいくつですか？",
      options: ["50億", "5億", "500万", "5000万"],
      answer: "50億" },
    { q: "8兆900万と8009億では、どちらが大きいですか？",
      options: ["8兆900万", "8009億", "同じ大きさ", "比べられない"],
      answer: "8兆900万" },
    { q: "「320兆」を数字で正しく書きなさい。",
      options: ["320000000000000", "32000000000000", "3200000000000", "3200000000000000"],
      answer: "320000000000000" }
];

let currentQuestionIndex = 0;
let correctCount = 0;
let questionOrder = [];

// DOM要素の取得
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
const questionArea = document.getElementById('question-area');
const stepTitle = document.getElementById('step-title');

let currentStep = 1;

// 問題のシャッフルと初期設定
function startGame() {
    // 0から9までの配列を作成し、シャッフルして出題順とする
    questionOrder = Array.from({ length: questions.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctCount = 0;
    scoreDisplay.textContent = `正解数: ${correctCount} / 10`;
    stepTitle.textContent = `🌟 ステップ ${currentStep}: 大きな数の世界 🌟`;

    resultArea.classList.add('hidden');
    feedbackArea.classList.add('hidden');
    questionArea.classList.remove('hidden');

    showQuestion();
}

// 次の問題を表示
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // 全問終了
        showResults();
        return;
    }

    const qIndex = questionOrder[currentQuestionIndex];
    const qData = questions[qIndex];

    questionText.textContent = `第${currentQuestionIndex + 1}問: ${qData.q}`;
    answerOptionsDiv.innerHTML = ''; // 選択肢をクリア
    feedbackArea.classList.add('hidden');

    // 選択肢をランダムに並び替えてボタンを作成
    const shuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, qData.answer);
        answerOptionsDiv.appendChild(button);
    });
}

// 解答チェック
function checkAnswer(selectedOption, correctAnswer) {
    // すべてのボタンを無効化
    Array.from(answerOptionsDiv.children).forEach(button => {
        button.disabled = true;
        // 選択したボタンと正解をハイライト
        if (button.textContent === selectedOption) {
            button.style.backgroundColor = (selectedOption === correctAnswer) ? '#00cc00' : '#cc0000'; // 緑か赤
        } else if (button.textContent === correctAnswer) {
            button.style.backgroundColor = '#00cc00'; // 正解を緑で表示
        }
    });

    if (selectedOption === correctAnswer) {
        correctCount++;
        feedbackText.textContent = "⭕ 正解！素晴らしい！";
    } else {
        feedbackText.textContent = "❌ 不正解... もう一度復習しよう！";
    }

    scoreDisplay.textContent = `正解数: ${correctCount} / 10`;
    feedbackArea.classList.remove('hidden');
}

// 次へボタンの処理
nextButton.onclick = () => {
    currentQuestionIndex++;
    showQuestion();
}

// 結果画面の表示
function showResults() {
    questionArea.classList.add('hidden');
    feedbackArea.classList.add('hidden');
    resultArea.classList.remove('hidden');

    finalScore.textContent = `最終正解数: ${correctCount} / 10`;

    if (correctCount >= 6) {
        resultMessage.textContent = "🎉 合格！次のステップに挑戦できます！";
        restartButton.textContent = "ステップ2へ進む";
        // 3Dオブジェクトを派手に光らせる演出など
        // 合格時は自動的に次のステップへ移行させる
        currentStep += 1;
        setTimeout(() => {
            startGame();
        }, 1200);
    } else {
        resultMessage.textContent = "😢 残念ながら不合格です。もう一度ステップ1に挑戦しましょう。";
        restartButton.textContent = "ステップ1に再挑戦";
        // 3Dオブジェクトを落ち着かせる演出など
        currentStep = 1;
    }
}

// ゲーム開始！
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    startGame();
});