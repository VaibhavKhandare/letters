// Lesson Navigation System
class LessonNavigator {
    constructor() {
        this.currentLesson = 1;
        this.totalLessons = 14; // Total vowels
        this.completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateProgress();
        this.loadLessonData();
    }

    initializeElements() {
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.lessonCounter = document.querySelector('.lesson-counter');
        this.progressFill = document.querySelector('.progress-fill');
        this.slides = document.querySelectorAll('.lesson-slide');
        this.playAudioBtn = document.getElementById('playAudio');
        this.testBtn = document.getElementById('testYourself');
        this.markCompleteBtn = document.getElementById('markComplete');
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.previousLesson());
        this.nextBtn.addEventListener('click', () => this.nextLesson());
        this.playAudioBtn.addEventListener('click', () => this.playAudio());
        this.testBtn.addEventListener('click', () => this.openTest());
        this.markCompleteBtn.addEventListener('click', () => this.markComplete());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousLesson();
            if (e.key === 'ArrowRight') this.nextLesson();
            if (e.key === ' ') {
                e.preventDefault();
                this.playAudio();
            }
        });
    }

    nextLesson() {
        if (this.currentLesson < this.totalLessons) {
            this.currentLesson++;
            this.updateLesson();
        }
    }

    previousLesson() {
        if (this.currentLesson > 1) {
            this.currentLesson--;
            this.updateLesson();
        }
    }

    updateLesson() {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        const currentSlide = document.querySelector(`[data-lesson="${this.currentLesson}"]`);
        if (currentSlide) {
            currentSlide.classList.add('active');
        }
        
        // Update navigation
        this.prevBtn.disabled = this.currentLesson === 1;
        this.nextBtn.disabled = this.currentLesson === this.totalLessons;
        
        // Update counter
        this.lessonCounter.textContent = `${this.currentLesson} of ${this.totalLessons}`;
        
        // Update progress
        this.updateProgress();
        
        // Update completion status
        this.updateCompletionStatus();
    }

    updateProgress() {
        const progressPercent = (this.currentLesson / this.totalLessons) * 100;
        this.progressFill.style.width = `${progressPercent}%`;
    }

    updateCompletionStatus() {
        const isCompleted = this.completed.includes(this.currentLesson);
        this.markCompleteBtn.textContent = isCompleted ? '✓ Completed' : '✓ Mark Complete';
        this.markCompleteBtn.style.background = isCompleted ? 
            'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    markComplete() {
        if (!this.completed.includes(this.currentLesson)) {
            this.completed.push(this.currentLesson);
            localStorage.setItem('completedLessons', JSON.stringify(this.completed));
            this.updateCompletionStatus();
            this.showCompletionFeedback();
        }
    }

    showCompletionFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'completion-feedback';
        feedback.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-icon">🎉</div>
                <div class="feedback-text">Lesson completed!</div>
            </div>
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }

    playAudio() {
        // Audio synthesis for vowel sounds
        this.synthesizeVowelSound(this.currentLesson);
    }

    synthesizeVowelSound(lessonNumber) {
        // Web Audio API implementation for vowel sounds
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            alert('Audio synthesis not supported in this browser');
            return;
        }

        const audioContext = new AudioContext();
        const vowelFrequencies = {
            1: { f1: 730, f2: 1090 }, // अ (a)
            2: { f1: 1000, f2: 1400 }, // आ (aa)
            3: { f1: 270, f2: 2290 }, // इ (i)
            4: { f1: 390, f2: 1990 }, // ई (ii)
            5: { f1: 440, f2: 1020 }, // उ (u)
            6: { f1: 300, f2: 870 }, // ऊ (uu)
            7: { f1: 530, f2: 1840 }, // ए (e)
            8: { f1: 660, f2: 1720 }, // ऐ (ai)
            9: { f1: 570, f2: 840 }, // ओ (o)
            10: { f1: 850, f2: 1610 }, // औ (au)
        };

        const frequencies = vowelFrequencies[lessonNumber];
        if (!frequencies) return;

        this.createVowelSound(audioContext, frequencies.f1, frequencies.f2);
    }

    createVowelSound(audioContext, f1, f2) {
        const duration = 1.0; // 1 second
        
        // Create oscillators for formants
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gainNode1 = audioContext.createGain();
        const gainNode2 = audioContext.createGain();
        const masterGain = audioContext.createGain();

        // Set frequencies
        osc1.frequency.setValueAtTime(f1, audioContext.currentTime);
        osc2.frequency.setValueAtTime(f2, audioContext.currentTime);

        // Set waveforms
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';

        // Set gains
        gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode2.gain.setValueAtTime(0.2, audioContext.currentTime);
        masterGain.gain.setValueAtTime(0.1, audioContext.currentTime);

        // Create envelope
        masterGain.gain.setValueAtTime(0, audioContext.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        masterGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + duration - 0.1);
        masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

        // Connect the audio graph
        osc1.connect(gainNode1);
        osc2.connect(gainNode2);
        gainNode1.connect(masterGain);
        gainNode2.connect(masterGain);
        masterGain.connect(audioContext.destination);

        // Start and stop
        osc1.start(audioContext.currentTime);
        osc2.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + duration);
        osc2.stop(audioContext.currentTime + duration);

        // Visual feedback
        this.showAudioFeedback();
    }

    showAudioFeedback() {
        this.playAudioBtn.style.transform = 'scale(1.1)';
        this.playAudioBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        
        setTimeout(() => {
            this.playAudioBtn.style.transform = 'scale(1)';
            this.playAudioBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 200);
    }

    openTest() {
        // Create a simple quiz modal
        this.createQuizModal();
    }

    createQuizModal() {
        const modal = document.createElement('div');
        modal.className = 'quiz-modal';
        modal.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-header">
                    <h3>Quick Test</h3>
                    <button class="close-quiz">×</button>
                </div>
                <div class="quiz-question">
                    <div class="question-letter">${this.getCurrentLetter()}</div>
                    <p>How is this letter pronounced?</p>
                    <div class="quiz-options">
                        ${this.generateQuizOptions()}
                    </div>
                </div>
                <div class="quiz-result" style="display: none;"></div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.close-quiz').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => this.checkAnswer(e, modal));
        });
    }

    getCurrentLetter() {
        const vowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'];
        return vowels[this.currentLesson - 1] || 'अ';
    }

    generateQuizOptions() {
        const correctAnswers = {
            1: 'a', 2: 'aa', 3: 'i', 4: 'ii', 5: 'u', 6: 'uu',
            7: 'e', 8: 'ai', 9: 'o', 10: 'au', 11: 'aṃ', 12: 'aḥ'
        };
        
        const allOptions = ['a', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au'];
        const correct = correctAnswers[this.currentLesson] || 'a';
        
        // Generate 3 wrong options
        const wrongOptions = allOptions.filter(opt => opt !== correct).slice(0, 3);
        const options = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);
        
        return options.map(option => 
            `<button class="quiz-option" data-answer="${option}">${option}</button>`
        ).join('');
    }

    checkAnswer(event, modal) {
        const selectedAnswer = event.target.dataset.answer;
        const correctAnswers = {
            1: 'a', 2: 'aa', 3: 'i', 4: 'ii', 5: 'u', 6: 'uu',
            7: 'e', 8: 'ai', 9: 'o', 10: 'au', 11: 'aṃ', 12: 'aḥ'
        };
        
        const correct = correctAnswers[this.currentLesson] || 'a';
        const isCorrect = selectedAnswer === correct;
        
        const resultDiv = modal.querySelector('.quiz-result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = isCorrect ? 
            '<div class="correct">✓ Correct! Well done!</div>' :
            `<div class="incorrect">✗ Incorrect. The correct answer is "${correct}"</div>`;
        
        // Disable all options
        modal.querySelectorAll('.quiz-option').forEach(opt => {
            opt.disabled = true;
            if (opt.dataset.answer === correct) {
                opt.style.background = '#22c55e';
                opt.style.color = 'white';
            }
        });
    }

    loadLessonData() {
        // Load any saved progress
        const savedLesson = localStorage.getItem('currentLesson');
        if (savedLesson) {
            this.currentLesson = parseInt(savedLesson);
        }
        this.updateLesson();
    }
}

// CSS for quiz modal and feedback
const additionalStyles = `
.quiz-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.quiz-content {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.quiz-header h3 {
    color: #667eea;
    font-size: 1.5rem;
    margin: 0;
}

.close-quiz {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-quiz:hover {
    background: #f0f0f0;
}

.question-letter {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-size: 4rem;
    color: #667eea;
    text-align: center;
    margin-bottom: 1rem;
}

.quiz-question p {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #333;
}

.quiz-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.quiz-option {
    padding: 1rem;
    border: 2px solid #e0e0e0;
    background: white;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.3s;
}

.quiz-option:hover:not(:disabled) {
    border-color: #667eea;
    background: #f8f9ff;
}

.quiz-option:disabled {
    cursor: not-allowed;
}

.quiz-result {
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    font-weight: 500;
}

.correct {
    background: #dcfce7;
    color: #166534;
}

.incorrect {
    background: #fef2f2;
    color: #dc2626;
}

.completion-feedback {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transition: all 0.3s ease;
}

.completion-feedback.show {
    transform: translate(-50%, -50%) scale(1);
}

.feedback-content {
    text-align: center;
}

.feedback-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feedback-text {
    font-size: 1.2rem;
    color: #22c55e;
    font-weight: 600;
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the lesson navigator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LessonNavigator();
});

// Save current lesson on page unload
window.addEventListener('beforeunload', () => {
    if (window.lessonNavigator) {
        localStorage.setItem('currentLesson', window.lessonNavigator.currentLesson);
    }
});

