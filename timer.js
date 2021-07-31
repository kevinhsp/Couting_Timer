class Timer {
    constructor(durationInput, startButton, lapButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startButton.addEventListener('click', this.startAndPause);
        this.lapButton = lapButton;
        this.lapButton.addEventListener('click', this.lapAndRest);
        // this.pauseButton.addEventListener('click', this.pause);
        this.firstStart = true;
        this.playing = false;
        this.ableToLap = false;
        this.ableToReset = false;
        this.count = 0;
    }
    startAndPause = () => {
        if(this.durationInput.value < 0 || this.durationInput.value === null || this.durationInput.value === "" || !isFinite(this.durationInput.value)) {
            alert("You need type in a number that bigger than '0' to start");
            return;
        }
        if(this.firstStart) {
            if(this.onStart) {
                this.onStart(this.durationInput.value);
            }
            this.firstStart = false;
        }
        if(!this.playing)
        {
            this.start();
            this.playing = true;
            this.ableToLap = true;
            this.ableToReset = false;
            this.durationInput.disabled = true;
            this.startButton.src = 
            'http://simpleicon.com/wp-content/uploads/pause.png';
            this.lapButton.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1024px-OOjs_UI_icon_add.svg.png';
        }
        else {
            this.pause();
            this.playing = false;
            this.ableToLap = false;
            this.ableToReset = true;
            this.durationInput.disabled = false;
            this.startButton.src = 
            'https://cdn.iconscout.com/icon/free/png-256/start-1438842-1214529.png';
            this.lapButton.src = 'https://icons.veryicon.com/png/o/miscellaneous/jt2/reset-filter-1.png';
        }
    }
    lapAndRest = () => {
        if(this.ableToLap) {
            this.count++;
            const li = document.createElement("p");
            li.innerHTML = "lap" + this.count +"                "  + this.durationInput.value + "   " + "<br>";
            const ul = document.querySelector("#list");
            ul.appendChild(li);
        }
        else {
            this.durationInput.value = "";
            this.count = 0;
            document.querySelector("#list").innerHTML = "";
            document.querySelector('circle').setAttribute('stroke-dashoffset', '0');
            this.firstStart = true;
        }
        
    }
    start = () => {
        this.tick();
        this.timer = setInterval(this.tick, 10);
    }
    pause = () => {
        clearInterval(this.timer);
    }
    get timeRemaing() {
        return parseFloat(this.durationInput.value);
    }
    set timeRemaing(time) {
        this.durationInput.value = time.toFixed(2);
    }
    tick = () => {
        if(this.durationInput.value <= 0) 
        {
            this.startAndPause();
            document.querySelector('circle').setAttribute('stroke-dashoffset', '0');
            this.firstStart = true;
            this.durationInput.value = "0.00";
            if(this.onComplete) {
                this.onComplete();
            }
        }
        else {
            this.timeRemaing -= 0.01;
            if(this.onTick) {
                this.onTick(this.timeRemaing);
            }
        }
    }
}