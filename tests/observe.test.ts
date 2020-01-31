import observe from '../src/observable';

const testFn = jest.fn((x) => x);

describe('observable', () => {
  it('setting the value', () => {
    const observable = observe<string>('test');
    expect(observable.value).toBe('test');
    observable.value = 'test 2';
    expect(observable.value).toBe('test 2');
  });

  it('Subscribing', () => {
    const observable = observe<string>('test');
    observable.subscribe(testFn);
    expect(testFn).not.toBeCalled();
    observable.value = 'new value';
    expect(testFn).toBeCalledTimes(1);
  });

  it('Unsubscribing', () => {
    const observable = observe<string>('test');
    const remove = observable.subscribe(testFn);
    observable.value = 'new value';
    expect(testFn).toBeCalledTimes(2);
    remove();
    observable.value = 'new value';
    expect(testFn).toBeCalledTimes(2);
  });
});
