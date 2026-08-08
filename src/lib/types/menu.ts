export type InputOrderItems = {
  menuItemId: number;
  quantity: number;
};

export type Order = {
  id: number;
  tableNumber: number;
  status: string;
  total: number;
  note: string;
  items: {
    quantity: number;
    menuItemId: number;
    menuItem: {
      name: string;
      image: string;
      price: number;
    };
  }[];
};
