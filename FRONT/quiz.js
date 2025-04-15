const quizData = [
    {
      question: "Qual é a capital do Brasil?",
      options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
      correct: 1
    },
    {
      question: "Quantos planetas há no sistema solar?",
      options: ["7", "8", "9", "10"],
      correct: 1
    },
    {
      question: "Quem escreveu 'Dom Casmurro'?",
      options: ["Machado de Assis", "José de Alencar", "Carlos Drummond", "Clarice Lispector"],
      correct: 0
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionEl = document.getElementById('questao');
  const optionsEl = document.getElementById('opcao');
  const nextBtn = document.getElementById('btn');
  const scoreEl = document.getElementById('rank');

  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';

    q.options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.classList.add('option');
      btn.textContent = opt;
      btn.addEventListener('click', () => selectOption(btn, index));
      optionsEl.appendChild(btn);
    });

    nextBtn.style.display = 'none';
    scoreEl.textContent = '';
  }

  function selectOption(button, selectedIndex) {
    const q = quizData[currentQuestion];
    const buttons = document.querySelectorAll('.option');

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      else if (i === selectedIndex) btn.classList.add('wrong');
    });

    if (selectedIndex === q.correct) {
      score++;
      scoreEl.textContent = "✅ Resposta correta!";
    } else {
      scoreEl.textContent = "❌ Resposta errada!";
    }

    nextBtn.style.display = 'inline-block';
  }

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showFinalScore();
    }
  });

  function showFinalScore() {
    questionEl.textContent = "Quiz finalizado!";
    optionsEl.innerHTML = '';
    scoreEl.innerHTML = `<strong>Você acertou ${score} de ${quizData.length} perguntas!</strong>`;
    nextBtn.style.display = 'none';
  }

  loadQuestion();