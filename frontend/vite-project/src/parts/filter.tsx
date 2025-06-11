import { useState, useRef, useEffect } from "react";
import axios from "axios";

interface FilterButtonProps {
  setOrders: (orders: any[]) => void;
}

function FilterButton({ setOrders }: FilterButtonProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    payment_method: "",
    order_date_from: "",
    order_date_to: "",
    total_min: "",
    total_max: "",
    last_updated_from: "",
    last_updated_to: "",
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleApplyFilters = async () => {
    try {
      const params: any = {};

      if (filters.status) params.status = filters.status;
      if (filters.payment_method) params.payment_method = filters.payment_method;
      if (filters.order_date_from && filters.order_date_to)
        params.order_date = `${filters.order_date_from},${filters.order_date_to}`;
      if (filters.total_min && filters.total_max)
        params.total_amount = `${filters.total_min},${filters.total_max}`;
      if (filters.last_updated_from && filters.last_updated_to)
        params.last_updated = `${filters.last_updated_from},${filters.last_updated_to}`;

      const query = new URLSearchParams(params).toString();
      const res = await axios.get(`http://127.0.0.1:8000/orders/?${query}`);
      const dataArray = res.data.results || res.data.orders || res.data;
      console.log("Filtered results:", dataArray);
      setOrders(dataArray);
      setShowFilterDropdown(false);
    } catch (err) {
      console.error("Filter fetch error:", err);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setShowFilterDropdown((prev) => !prev)}
        className="w-80 px-4 py-2 rounded-xl text-white bg-transparent border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Filter Orders
      </button>

      {showFilterDropdown && (
        <div className="absolute top-full mt-2 right-0 w-96 bg-black border border-green-500 rounded-xl p-4 z-20 space-y-4 text-white max-h-[550px] overflow-auto">
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 rounded bg-zinc-800 border border-green-500"
            >
              <option value="">Select</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          {/* Payment Method Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={filters.payment_method}
              onChange={(e) => setFilters({ ...filters, payment_method: e.target.value })}
              className="w-full px-3 py-2 rounded bg-zinc-800 border border-green-500"
            >
              <option value="">Select</option>
              <option value="cash on Delivery">Cash on Delivery</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          {/* Order Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Order Date (From - To)</label>
            <div className="flex space-x-2">
              <input
                type="date"
                placeholder="YYYY-MM-DD"
                value={filters.order_date_from}
                onChange={(e) => setFilters({ ...filters, order_date_from: e.target.value })}
                className="w-1/2 px-3 py-2 rounded bg-zinc-800 border border-green-500 text-white"
              />
              <input
                type="date"
                placeholder="YYYY-MM-DD"
                value={filters.order_date_to}
                onChange={(e) => setFilters({ ...filters, order_date_to: e.target.value })}
                className="w-1/2 px-3 py-2 rounded bg-zinc-800 border border-green-500 text-white"
              />
            </div>
          </div>

          {/* Total Amount Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Total Amount (Min - Max)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.total_min}
                onChange={(e) => setFilters({ ...filters, total_min: e.target.value })}
                className="w-1/2 px-3 py-2 rounded bg-zinc-800 border border-green-500 text-white"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.total_max}
                onChange={(e) => setFilters({ ...filters, total_max: e.target.value })}
                className="w-1/2 px-3 py-2 rounded bg-zinc-800 border border-green-500 text-white"
              />
            </div>
          </div>

          {/* Last Updated Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Last Updated (From - To)</label>
            <div className="flex space-x-2">
              <input
                type="date"
                placeholder="YYYY-MM-DD"
                value={filters.last_updated_from}
                onChange={(e) => setFilters({ ...filters, last_updated_from: e.target.value })}
                className="w-1/2 px-3 py-2 rounded bg-zinc-800 border border-green-500 text-white"
              />
              <input
                type="date"
                placeholder="YYYY-MM-DD"
                value={filters.last_updated_to}
                onChange={(e) => setFilters({ ...filters, last_updated_to: e.target.value })}
                className="w-1/2 px-3 py-2 rounded bg-zinc-800 border border-green-500 text-white"
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilters}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl mt-4"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterButton;
