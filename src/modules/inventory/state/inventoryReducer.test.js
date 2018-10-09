import inventoryReducer from './inventoryReducer';

describe('src.modules.inventory.inventoryReducer', () => {
  it('should return initial state', () => {
    const result = inventoryReducer(undefined, {});

    expect(result.items).toEqual({});
    expect(result.changeLog).toEqual([]);
    expect(result.isGlobalLoaded).toEqual(false);
    expect(result.hasGlobalLoadingError).toEqual(false);
    expect(result.isChangeLogLoading).toEqual(false);
    expect(result.isChangeLogLoaded).toEqual(false);
    expect(result.hasChangeLogLoadingError).toEqual(false);
    expect(result.numberOfSalesMonitor).toHaveLength(11);
    result.numberOfSalesMonitor.forEach(x => {
      expect(x).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          sales: NaN,
          date: expect.any(Number),
        }),
      );
    });
  });

  it('should handle INVENTORY_GLOBAL_REQUEST', () => {
    const action = {
      type: 'INVENTORY_GLOBAL_REQUEST',
    };

    expect(inventoryReducer({}, action)).toEqual({
      isGlobalLoading: true,
      hasGlobalLoadingError: false,
    });
  });

  it('should handle INVENTORY_GLOBAL_SUCCESS', () => {
    const action = {
      type: 'INVENTORY_GLOBAL_SUCCESS',
      payload: {
        inventory: [
          {
            storeId: 'storeA',
            inventory: [
              {
                shoeId: 'shoeB',
                otherData: 'otherData',
              },
              {
                shoeId: 'shoeC',
                otherData: 'otherData',
              },
            ],
          },
          {
            storeId: 'storeB',
            inventory: [],
          },
        ],
      },
    };

    expect(inventoryReducer({ items: {} }, action)).toEqual({
      items: {
        storeA: {
          storeId: 'storeA',
          inventory: {
            shoeB: {
              shoeId: 'shoeB',
              otherData: 'otherData',
            },
            shoeC: {
              shoeId: 'shoeC',
              otherData: 'otherData',
            },
          },
        },
        storeB: {
          storeId: 'storeB',
          inventory: {},
        },
      },
      isGlobalLoading: false,
      isGlobalLoaded: true,
      hasGlobalLoadingError: false,
    });
  });

  /* ... */

  it('should handle INVENTORY_CHANGE_LOG_REMOVE_NEW_FLAG', () => {
    const action = {
      type: 'INVENTORY_CHANGE_LOG_REMOVE_NEW_FLAG',
    };

    expect(
      inventoryReducer(
        {
          changeLog: [
            { otherData: 'otherData', isNew: true },
            { otherData: 'otherData', isNew: true },
            { otherData: 'otherData', isNew: true },
          ],
        },
        action,
      ),
    ).toEqual({
      changeLog: [
        { otherData: 'otherData', isNew: false },
        { otherData: 'otherData', isNew: false },
        { otherData: 'otherData', isNew: false },
      ],
    });
  });

  /* ... */
});
