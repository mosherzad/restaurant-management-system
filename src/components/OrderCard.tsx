type OrderCard = {
  id: number;
  tableNumber: number;
  price: number;
  itemsCount: number;
};
const OrderCard = () => {
  const containerColor = "rgba(236, 109, 19, 0.2)";

  const orders: OrderCard[] = [
    { id: 1, tableNumber: 4, price: 36.5, itemsCount: 3 },
    { id: 2, tableNumber: 7, price: 52, itemsCount: 5 },
    { id: 3, tableNumber: 10, price: 21.75, itemsCount: 2 },
    { id: 4, tableNumber: 3, price: 21.75, itemsCount: 3 },
    { id: 5, tableNumber: 1, price: 21.75, itemsCount: 3 },
    { id: 6, tableNumber: 6, price: 21.75, itemsCount: 3 },
    { id: 7, tableNumber: 9, price: 21.75, itemsCount: 3 },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-md border border-white/20 p-4 text-white"
          style={{ backgroundColor: containerColor }}
        >
          <p className="text-sm text-white/80">Table</p>
          <p className="text-xl font-bold mb-3">#{order.tableNumber}</p>

          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span className="text-white/80">Price</span>
              <span className="font-semibold">${order.price.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-white/80">Items</span>
              <span className="font-semibold">{order.itemsCount}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
