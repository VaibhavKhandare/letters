// Lesson Navigation System with Dynamic Data Loading
class LessonNavigator {
    constructor() {
        this.currentLesson = 1;
        this.totalLessons = 12; // Will be updated after loading data
        this.completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        this.lessonData = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadLessonData();
    }

    initializeElements() {
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.lessonCounter = document.querySelector('.lesson-counter');
        this.progressFill = document.querySelector('.progress-fill');
        this.lessonContent = document.getElementById('lessonContent');
        this.playAudioBtn = document.getElementById('playAudio');
        this.testBtn = document.getElementById('testYourself');
        this.markCompleteBtn = document.getElementById('markComplete');
    }

    async loadLessonData() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            this.lessonData = data.vowels;
            this.totalLessons = this.lessonData.lessons.length;
            this.generateAllLessons();
            this.updateProgress();
            this.updateLesson();
        } catch (error) {
            console.error('Error loading lesson data:', error);
            // Fallback to basic lessons if JSON fails
            this.createFallbackLessons();
        }
    }

    generateAllLessons() {
        this.lessonContent.innerHTML = '';
        
        // Generate regular vowel lessons
        this.lessonData.lessons.forEach((lesson, index) => {
            const slideElement = this.createLessonSlide(lesson, index === 0);
            this.lessonContent.appendChild(slideElement);
        });

        // Add summary slide
        const summarySlide = this.createSummarySlide();
        this.lessonContent.appendChild(summarySlide);
    }

    createLessonSlide(lesson, isActive = false) {
        const slide = document.createElement('div');
        slide.className = `lesson-slide${isActive ? ' active' : ''}`;
        slide.setAttribute('data-lesson', lesson.id);

        // Handle different mouth position structures
        const mouthPositionItems = this.generateMouthPositionItems(lesson.mouthPosition);
        
        slide.innerHTML = `
            <div class="letter-display">
                <div class="main-letter">${lesson.letter}</div>
                <div class="romanization">${lesson.romanization}</div>
                <div class="sound-description">${lesson.soundDescription}</div>
            </div>
            
            <div class="lesson-details">
                <div class="mouth-position">
                    <h3>Mouth Position</h3>
                    <div class="position-grid">
                        ${mouthPositionItems}
                    </div>
                </div>

                <div class="practice-section">
                    <h3>Practice</h3>
                    <div class="practice-words">
                        ${lesson.practiceWords.map(word => `
                            <div class="word-item">
                                <span class="hindi">${word.hindi}</span>
                                <span class="romanization">${word.romanization}</span>
                                <span class="meaning">${word.meaning}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="tips-section">
                    <h3>Key Points</h3>
                    <ul>
                        ${lesson.keyPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        return slide;
    }

    generateMouthPositionItems(mouthPosition) {
        const items = [];
        
        // Handle different properties
        if (mouthPosition.tongue) {
            items.push(`<div class="position-item"><strong>Tongue:</strong> ${mouthPosition.tongue}</div>`);
        }
        if (mouthPosition.lips) {
            items.push(`<div class="position-item"><strong>Lips:</strong> ${mouthPosition.lips}</div>`);
        }
        if (mouthPosition.jaw) {
            items.push(`<div class="position-item"><strong>Jaw:</strong> ${mouthPosition.jaw}</div>`);
        }
        if (mouthPosition.throat) {
            items.push(`<div class="position-item"><strong>Throat:</strong> ${mouthPosition.throat}</div>`);
        }
        if (mouthPosition.duration) {
            items.push(`<div class="position-item"><strong>Duration:</strong> ${mouthPosition.duration}</div>`);
        }
        if (mouthPosition.feature) {
            items.push(`<div class="position-item"><strong>Feature:</strong> ${mouthPosition.feature}</div>`);
        }
        
        // Handle diphthongs
        if (mouthPosition.tongueStart) {
            items.push(`<div class="position-item"><strong>Start Position:</strong> ${mouthPosition.tongueStart}</div>`);
            items.push(`<div class="position-item"><strong>End Position:</strong> ${mouthPosition.tongueEnd}</div>`);
            items.push(`<div class="position-item"><strong>Movement:</strong> ${mouthPosition.lipMovement}</div>`);
        }
        
        // Handle special characters
        if (mouthPosition.specialAction) {
            items.push(`<div class="position-item"><strong>Special Action:</strong> ${mouthPosition.specialAction}</div>`);
        }

        return items.join('');
    }

    createSummarySlide() {
        const slide = document.createElement('div');
        slide.className = 'lesson-slide';
        slide.setAttribute('data-lesson', this.totalLessons + 1);

        slide.innerHTML = `
            <div class="summary-content">
                <h2>Vowel Summary</h2>
                <div class="vowel-chart-container">
                    <h3>Vowel Position Chart</h3>
                    <div class="chart-visual">
                        <pre class="vowel-chart-text">
        FRONT                BACK
         ↑                    ↑
HIGH    इ ई                  उ ऊ    ← Tongue Height
         ↓                    ↓
         ए                    ओ
MID      ↓                    ↓
         ऐ →→→              ←←← औ   (glides)
         ↓                    ↓
LOW      └─────── आ ──────────┘
               ↓
              अ (neutral/center)

[Lips]  ←spread→  neutral  ←round→
        इ ई ए ऐ    अ आ      ओ औ उ ऊ
                        </pre>
                    </div>
                </div>

                <div class="memory-tricks">
                    <h3>Memory Tricks</h3>
                    <div class="tricks-grid">
                        <div class="trick-item">
                            <strong>अ vs आ:</strong> Short "uh" vs Long "aah"
                        </div>
                        <div class="trick-item">
                            <strong>इ vs ई:</strong> "bit" vs "beat"
                        </div>
                        <div class="trick-item">
                            <strong>उ vs ऊ:</strong> "put" vs "pool"
                        </div>
                        <div class="trick-item">
                            <strong>ए vs ऐ:</strong> "day" (slight) vs "ice" (full glide)
                        </div>
                        <div class="trick-item">
                            <strong>ओ vs औ:</strong> "go" (slight) vs "out" (full glide)
                        </div>
                        <div class="trick-item">
                            <strong>Nasalization (ं):</strong> Air through nose
                        </div>
                    </div>
                </div>

                <div class="completion-badge">
                    <h3>🎉 Congratulations!</h3>
                    <p>You've completed all Hindi vowels. Ready for consonants?</p>
                    <button class="action-btn" onclick="window.location.href='index.html'">Explore Consonants</button>
                </div>
            </div>
        `;

        return slide;
    }

    createFallbackLessons() {
        // Fallback basic lessons if JSON loading fails
        this.lessonContent.innerHTML = `
            <div class="lesson-slide active" data-lesson="1">
                <div class="letter-display">
                    <div class="main-letter">अ</div>
                    <div class="romanization">a</div>
                    <div class="sound-description">"u" in "but"</div>
                </div>
                <p>Loading lesson data...</p>
            </div>
        `;
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
        if (this.currentLesson < this.totalLessons + 1) { // +1 for summary
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
        const slides = document.querySelectorAll('.lesson-slide');
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        const currentSlide = document.querySelector(`[data-lesson="${this.currentLesson}"]`);
        if (currentSlide) {
            currentSlide.classList.add('active');
        }
        
        // Update navigation
        this.prevBtn.disabled = this.currentLesson === 1;
        this.nextBtn.disabled = this.currentLesson === this.totalLessons + 1;
        
        // Update counter
        if (this.currentLesson <= this.totalLessons) {
            this.lessonCounter.textContent = `${this.currentLesson} of ${this.totalLessons}`;
        } else {
            this.lessonCounter.textContent = `Summary`;
        }
        
        // Update progress
        this.updateProgress();
        
        // Update completion status
        this.updateCompletionStatus();
    }

    updateProgress() {
        const progressPercent = (this.currentLesson / (this.totalLessons + 1)) * 100;
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
        
        // Get frequency data from lesson data
        let frequencies;
        if (this.lessonData && this.lessonData.lessons[lessonNumber - 1]) {
            frequencies = this.lessonData.lessons[lessonNumber - 1].audioFreq;
        } else {
            // Fallback frequencies
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
                11: { f1: 730, f2: 1090, nasal: true }, // अं
                12: { f1: 730, f2: 1090, breathy: true }, // अः
            };
            frequencies = vowelFrequencies[lessonNumber];
        }

        if (!frequencies) return;

        this.createVowelSound(audioContext, frequencies.f1, frequencies.f2, frequencies.nasal, frequencies.breathy);
    }

    createVowelSound(audioContext, f1, f2, isNasal = false, isBreathy = false) {
        const duration = isBreathy ? 1.5 : 1.0; // Longer for breathy sounds
        
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

        // Add nasal resonance
        if (isNasal) {
            const nasalOsc = audioContext.createOscillator();
            const nasalGain = audioContext.createGain();
            nasalOsc.frequency.setValueAtTime(250, audioContext.currentTime); // Nasal formant
            nasalOsc.type = 'sine';
            nasalGain.gain.setValueAtTime(0.1, audioContext.currentTime);
            nasalOsc.connect(nasalGain);
            nasalGain.connect(masterGain);
            nasalOsc.start(audioContext.currentTime);
            nasalOsc.stop(audioContext.currentTime + duration);
        }

        // Create envelope
        masterGain.gain.setValueAtTime(0, audioContext.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        
        if (isBreathy) {
            // Add breathiness by modulating gain
            masterGain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + duration - 0.5);
        } else {
            masterGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + duration - 0.1);
        }
        
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
        if (this.lessonData && this.lessonData.lessons[this.currentLesson - 1]) {
            return this.lessonData.lessons[this.currentLesson - 1].letter;
        }
        const vowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'];
        return vowels[this.currentLesson - 1] || 'अ';
    }

    generateQuizOptions() {
        const correctAnswers = {
            1: 'a', 2: 'aa', 3: 'i', 4: 'ii', 5: 'u', 6: 'uu',
            7: 'e', 8: 'ai', 9: 'o', 10: 'au', 11: 'aṃ', 12: 'aḥ'
        };
        
        const allOptions = ['a', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au', 'aṃ', 'aḥ'];
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
}

// CSS for quiz modal and feedback (keeping existing styles)
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

.completion-badge {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    margin-top: 2rem;
}

.completion-badge h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

.completion-badge p {
    margin-bottom: 1.5rem;
    opacity: 0.9;
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