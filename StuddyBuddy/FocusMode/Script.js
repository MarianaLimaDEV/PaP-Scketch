let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds
let completedSessions = 0; // Contador de sessões concluídas

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const shortBreakButton = document.getElementById('shortBreak');
const longBreakButton = document.getElementById('longBreak');
const progressDots = document.getElementById('progressDots');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const spotifyPopup = document.getElementById('spotifyPopup');
const connectSpotifyButton = document.getElementById('connectSpotify');
const closePopupButton = document.getElementById('closePopup');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = 'Start';
    } else {
        isRunning = true;
        startButton.textContent = 'Pause';
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                alert('Time is up!');
                isRunning = false;
                startButton.textContent = 'Start';
                addProgressDot(); // Adiciona uma bolinha ao final do timer
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
    startButton.textContent = 'Start';
}

function shortBreak() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 5 * 60; // 5 minutos
    updateTimerDisplay();
    startButton.textContent = 'Start';
}

function longBreak() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 15 * 60; // 15 minutos
    updateTimerDisplay();
    startButton.textContent = 'Start';
}

function addProgressDot() {
    completedSessions++;
    const dot = document.createElement('div');
    dot.classList.add('dot', 'filled');
    progressDots.appendChild(dot);
}

// Adiciona uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = document.createElement('li');

    // Texto da tarefa
    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;

    // Botões de ação
    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');

    // Botão de concluir
    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    // Botão de remover
    const removeButton = document.createElement('button');
    removeButton.textContent = '✖';
    removeButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(removeButton);

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(taskButtons);

    taskList.appendChild(taskItem);

    taskInput.value = ''; // Limpa o campo de entrada
}

// Abre o popup do Spotify
function openSpotifyPopup() {
    spotifyPopup.classList.remove('hidden');
}

// Fecha o popup do Spotify
function closeSpotifyPopup() {
    spotifyPopup.classList.add('hidden');
}

// Evento para conectar ao Spotify
connectSpotifyButton.addEventListener('click', () => {
    alert('Redirecting to Spotify...');
    closeSpotifyPopup();
});

// Evento para fechar o popup
closePopupButton.addEventListener('click', closeSpotifyPopup);

// Exemplo: abrir o popup automaticamente ao carregar a página
window.addEventListener('load', () => {
    setTimeout(openSpotifyPopup, 2000); // Abre o popup após 2 segundos
});

// Evento para adicionar tarefa
addTaskButton.addEventListener('click', addTask);

// Permite adicionar tarefa pressionando "Enter"
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
shortBreakButton.addEventListener('click', shortBreak);
longBreakButton.addEventListener('click', longBreak);

updateTimerDisplay();