var BlurayPlayer = /** @class */ (function () {
    function BlurayPlayer() {
    }
    BlurayPlayer.prototype.on = function () {
        console.log('Bluray on');
    };
    BlurayPlayer.prototype.turnOff = function () {
        console.log('Bluray off');
    };
    BlurayPlayer.prototype.play = function () {
        console.log('Playing bluray movie');
    };
    return BlurayPlayer;
}());
var Amplifier = /** @class */ (function () {
    function Amplifier() {
    }
    Amplifier.prototype.on = function () {
        console.log('Amp is turning on');
    };
    Amplifier.prototype.turnOff = function () {
        console.log('Amp turning off');
    };
    Amplifier.prototype.setSource = function (source) {
        console.log('Setting source to ' + source);
    };
    Amplifier.prototype.setVolume = function (volumeLevel) {
        console.log('Setting volume to ' + volumeLevel);
    };
    return Amplifier;
}());
var HomeTeatherFacade = /** @class */ (function () {
    function HomeTeatherFacade(amp, bluray) {
        this.amp = amp;
        this.bluray = bluray;
    }
    HomeTeatherFacade.prototype.watchMovie = function () {
        this.amp.on();
        this.amp.setSource('bluray');
        this.amp.setVolume(11);
        this.bluray.on();
        this.bluray.play;
    };
    HomeTeatherFacade.prototype.endMovie = function () {
        this.amp.turnOff();
        this.bluray.turnOff();
    };
    return HomeTeatherFacade;
}());
var bluray = new BlurayPlayer();
var amp = new Amplifier();
var hometheater = new HomeTeatherFacade(amp, bluray);
hometheater.watchMovie();
setTimeout(function () {
    hometheater.endMovie();
}, 2000);
