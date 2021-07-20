import React from "react";
import { useQueryClient } from "react-query";
const SENSOR_WS = "ws://127.0.0.1:8080";

export const useInventoryUpdates = ({ setSettings }) => {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const websocket = new WebSocket(SENSOR_WS);
    websocket.onopen = () => {
      setSettings((prev) => ({ ...prev, isSocketConnected: true }));
      console.log("connected");
    };
    websocket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const currentInventoryData = queryClient.getQueryData("products");

      const updatedInventory = currentInventoryData.map((inventory) => {
        if (
          inventory.product_id == eventData.product_id &&
          inventory.store_id == eventData.store_id
        ) {
          return {
            ...inventory,
            ...eventData,
            updated: true,
            state: eventData.units_in_stock < 3 ? "warning" : undefined,
          };
        }
        return { ...inventory, state: undefined, updated: false };
      });
      queryClient.setQueryData("products", [...updatedInventory]);
    };

    return () => {
      setSettings((prev) => ({ ...prev, isConnected: false }));
      websocket.close();
    };
  }, [queryClient]);
};
