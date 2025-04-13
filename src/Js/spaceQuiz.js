const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const leaderboardBody = document.querySelector('#leaderboard tbody');

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// Load questions from a separate JSON file
fetch('src/Js/spaceQuiz.json')
  .then(response => response.json())
  .then(data => {
    selectedQuestions = shuffleArray(Array.isArray(data) ? data : data.questions).slice(0, 10);
    displayQuestion();
  });

function shuffleArray(array) {
  if (!Array.isArray(array)) {
    console.error('Data is not an array:', array);
    return [];
  }
  return array.sort(() => Math.random() - 0.5);
}

function displayQuestion() {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = '';
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
  const buttons = document.querySelectorAll('#options button');
  buttons.forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.style.backgroundColor = '#2a9d8f';
    } else {
      button.style.backgroundColor = '#e63946';
    }
  });

  if (selectedOption === correctAnswer) {
    score++;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
      displayQuestion();
    } else {
      showResultModal();
    }
  }, 1000);
}

function showResultModal() {
  const modal = document.createElement('div');
  modal.id = 'resultModal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.color = '#fff';
  modal.innerHTML = `
    <div style="background:#1b263b;padding:30px;border-radius:10px;text-align:center;">
      <h2>Quiz Completed!</h2>
      <p>Total Questions: ${selectedQuestions.length}</p>
      <p>Correct Answers: ${score}</p>
      <p>Wrong Answers: ${selectedQuestions.length - score}</p>
      <button id="submitScore">Submit</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('submitScore').onclick = () => {
    const name = prompt('Enter your name:');
    if (name) {
      updateLeaderboard(name, score);
      document.body.removeChild(modal);
    }
  };
}

function updateLeaderboard(name, score) {
  fetch('Components/submit_score.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        showLeaderboard();
      } else {
        alert('Failed to save score!');
      }
    });
}

function showLeaderboard() {
  fetch('Components/get_leaderboard.php')
    .then(res => res.json())
    .then(data => {
      leaderboardBody.innerHTML = '';
      data.forEach(entry => {
        const row = `<tr><td>${entry.username}</td><td>${entry.score}</td></tr>`;
        leaderboardBody.innerHTML += row;
      });
    });
}

showLeaderboard();
