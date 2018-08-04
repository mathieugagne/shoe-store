import sagas from '../saga';

const sagaInstance = sagas();

describe('saga.test', () => {
  it('test channel', () => {
    const channel = sagaInstance.next().value.CALL.fn();
    // console.log('a :', channel);
    expect(channel).toBeTruthy();
  });
});
