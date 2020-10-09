interface IPhone {
    useLightning();
}

interface Android {
    useMicroUSB();
}

class iPhone7 implements IPhone {
    useLightning() {
        console.log('Using lighting port...');
    }
}

class GooglePixel implements Android {
    useMicroUSB() {
        console.log('Using micro USB...');
    }
}

class LightningToMicroUSBAdapter implements Android {
    iphoneDevice: IPhone;

    constructor(iphone: IPhone) {
        this.iphoneDevice = iphone;
    }

    public useMicroUSB() {
        console.log('Want to use micro USB, converting to Lightning....');
        this.iphoneDevice.useLightning();
    }
}

let iphone = new iPhone7();
let chargeAdapter = new LightningToMicroUSBAdapter(iphone);

chargeAdapter.useMicroUSB();