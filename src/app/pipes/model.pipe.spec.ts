import { ModelPipe } from './model.pipe';

describe('ModelPipe', () => {
  it('create an instance', () => {
    const pipe = new ModelPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
