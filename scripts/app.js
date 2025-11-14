// Audio player and radio controller
class RetroRadio {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.powerBtn = document.getElementById('powerBtn');
        this.presetBtns = document.querySelectorAll('.preset-btn');
        this.radioContainer = document.querySelector('.radio-container');
        
        this.isPlaying = false;
        this.currentPreset = 0;

        this.init();
    }

    init() {
        this.powerBtn.addEventListener('click', () => this.togglePower());
        this.presetBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => this.selectPreset(index));
        });
        
        this.updateButtonStates();
    }

    togglePower() {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.startAudio();
            this.powerBtn.classList.add('active');
            this.radioContainer.classList.add('playing');
        } else {
            this.stopAudio();
            this.powerBtn.classList.remove('active');
            this.radioContainer.classList.remove('playing');
        }
    }

    async startAudio() {
        try {
            // Jangan reset currentTime, biarkan continue dari posisi terakhir
            await this.audio.play();
            console.log('Audio started successfully');
        } catch (err) {
            console.log('Audio playback failed:', err);
            this.isPlaying = false;
            this.powerBtn.classList.remove('active');
            this.radioContainer.classList.remove('playing');
        }
    }

    stopAudio() {
        this.audio.pause();
        console.log('Audio paused');
    }

    selectPreset(index) {
        // Hanya update preset dan konten, TIDAK ganggu audio
        this.currentPreset = index;
        this.updateButtonStates();
        this.switchContent(index);
        
        // Audio TIDAK di-restart, biarkan terus berputar
        console.log('Preset changed to', index, '- Audio continues playing');
    }

    switchContent(index) {
        const contentItems = document.querySelectorAll('.content-item');
        contentItems.forEach(item => item.classList.remove('active'));
        
        setTimeout(() => {
            contentItems[index].classList.add('active');
        }, 50);
    }

    updateButtonStates() {
        this.presetBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === this.currentPreset);
        });
    }
}

// Initialize radio
document.addEventListener('DOMContentLoaded', () => {
    new RetroRadio();
});