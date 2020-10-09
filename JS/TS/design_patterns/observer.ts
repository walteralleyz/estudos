interface Subject {
    registerObserver(o: Observer);
    removeObserver(o: Observer);
    notifyObservers();
}

interface Observer {
    update(temperature: number);
}

class WeatherStation {
    private temperature: number;
    private observers: Observer[] = [];

    setTemperature(temp: number) {
        console.log('WeatherStation ' + temp);
        this.temperature = temp;
        this.notifyObservers();
    }

    public registerObserver(o: Observer) {
        this.observers.push(o);
    }

    public removeObserver(o: Observer) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };

    public notifyObservers() {
        for(let observer of this.observers) {
            observer.update(this.temperature);
        }
    };

}

class TemperatureDisplay implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }

    public update(temperature: number) {
        console.log('Temperature: I need to update!');
    }
}

class Fan implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }

    public update(temperature: number) {
        if(temperature > 25) {
            console.log('Fan: Its hot here, turn ON');
            return false;
        };
        console.log('Fan: Its nice and cool, turn OFF');
    }
}

let weatherStation = new WeatherStation();
let tempDisplay = new TemperatureDisplay(weatherStation);
let fan = new Fan(weatherStation);

weatherStation.setTemperature(20);
weatherStation.setTemperature(30);