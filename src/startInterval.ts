import { observable } from 'mobx';

class Interval {
    private data!: any; 
    timeout: number; 
    callback: any;
    interval: any;
    startTime!: number;
    stopTime!: number;
    pauseTime: number;
    constructor(callback: any, timeout: number) {
        this.timeout = timeout + 0.999;
        this.callback = callback;
        this.pauseTime = new Date().getTime() * 0.001;
        this.data = observable({
            value: this.timeout,
            state: 'unpaused',
        });
        this.unpause();
    }
    get value(): number {
        return this.data.value;
    }
    set value(x: number) {
        this.data.value = x;
    }
    get state(): string {
        return this.data.state;
    }
    set state(x: string) {
        this.data.state = x;
    }
    restart(): void {
        this.value = this.timeout;
        this.pause();
        this.unpause();
    }
    unpause(): void {
        this.state = 'unpaused';
        const now = new Date().getTime() * 0.001;
        this.startTime = now; 
        this.stopTime = now + this.value;
        this.interval = setInterval(() => {
            this.update();
            if(this.value <= 0) {
                this.callback();
                this.restart();
            }
        }, 200); 
        this.update();
    }
    pause(): void {
        this.state = 'paused';
        clearInterval(this.interval);
        this.pauseTime = new Date().getTime() * 0.001;
    }
    update(): void {
        if(this.state === 'paused') {
            this.value = this.stopTime - this.pauseTime;
            return;
        }
        const now = new Date().getTime() * 0.001;
        if(now > this.stopTime) {
            this.value = 0;
            return;
        }
        this.value = this.stopTime - now;
    }
}

export default function startInterval(
    callback: any, 
    timeout: number
): Interval {
    return new Interval(callback, timeout);
}

