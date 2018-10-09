import {
  shoeIdSelector,
  shoeItemsSelector,
  shoeListSelector,
  shoeSelector,
} from './shoeSelectors';

describe('src.modules.shoe.state.shoeSelectors', () => {
  it('should select shoe Id', () => {
    expect(shoeIdSelector({}, { shoeId: 'shoeA' })).toBe('shoeA');
  });

  it('should select shoe items', () => {
    const items = {};

    expect(shoeItemsSelector({ shoe: { items } })).toBe(items);
  });

  it('should list shoes', () => {
    const shoeA = {};
    const shoeB = {};

    expect(shoeListSelector.resultFunc({ shoeA, shoeB })).toEqual(
      expect.arrayContaining([shoeA, shoeB]),
    );
  });

  it('should get shoeA', () => {
    const shoeA = { id: 'shoeA' };
    const shoeB = { id: 'shoeB' };

    expect(shoeSelector.resultFunc({ shoeA, shoeB }, 'shoeA')).toBe(shoeA);
  });
});
