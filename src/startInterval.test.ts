import startInterval from './startInterval';
import sinon from 'sinon';

it('show time remaining', () => {
    const clock = sinon.useFakeTimers();
    const interval = startInterval(() => {}, 5);
    expect(interval.value).toBe(5);    
    clock.restore();
});

it('show zero seconds when timeout', () => {
    const clock = sinon.useFakeTimers();
    const interval = startInterval(() => {}, 5);
    clock.tick(5000);
    expect(interval.value).toBe(0);    
    clock.restore();
});

it('show no progress when paused', () => {
    const clock = sinon.useFakeTimers();
    const interval = startInterval(() => {}, 5);
    interval.pause();
    clock.tick(5000);
    expect(interval.value).toBe(5);    
    clock.restore();
});

it('trigger callback on timeout', () => {
    const clock = sinon.useFakeTimers();
    const callback = jest.fn();
    const interval = startInterval(callback, 5);
    expect(callback).not.toHaveBeenCalled();    
    clock.tick(5000);
    expect(callback).toHaveBeenCalled();    
    clock.restore();
});

it('restart after pause', () => {
    const clock = sinon.useFakeTimers();
    const interval = startInterval(() => {}, 5);
    interval.pause();
    clock.tick(5000);
    interval.unpause();
    clock.tick(5000);
    expect(interval.value).toBe(0);    
    clock.restore();
});
