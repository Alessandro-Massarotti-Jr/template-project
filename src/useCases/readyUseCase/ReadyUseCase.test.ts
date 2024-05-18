import { ReadyUseCase } from './ReadyUseCase';
const readyUseCase = new ReadyUseCase();
describe('ReadyUseCase unit test', () => {
  it('should execute succesfuly', async () => {
    const data = await readyUseCase.execute();
    expect(data).toEqual({});
  });
});
