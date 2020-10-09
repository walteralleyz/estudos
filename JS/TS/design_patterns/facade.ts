class BlurayPlayer {
    on() {
        console.log('Bluray on');
    }

    turnOff() {
        console.log('Bluray off');
    }

    play() {
        console.log('Playing bluray movie');
    }
}

class Amplifier {
    on() {
        console.log('Amp is turning on');
    }

    turnOff() {
        console.log('Amp turning off');
    }

    setSource(source: string) {
        console.log('Setting source to '+ source);
    }

    setVolume(volumeLevel: number) {
        console.log('Setting volume to ' + volumeLevel);
    }
}

class HomeTeatherFacade {
    private bluray: BlurayPlayer;
    private amp: Amplifier;

    constructor(amp: Amplifier, bluray: BlurayPlayer) {
        this.amp = amp;
        this.bluray = bluray;
    }

    public watchMovie() {
        this.amp.on();
        this.amp.setSource('bluray');
        this.amp.setVolume(11);
        this.bluray.on();
        this.bluray.play;
    }

    public endMovie() {
        this.amp.turnOff();
        this.bluray.turnOff();
    }
}

let bluray = new BlurayPlayer();
let amp = new Amplifier();

let hometheater = new HomeTeatherFacade(amp, bluray);
hometheater.watchMovie();

setTimeout(() => {
    hometheater.endMovie();
}, 2000);