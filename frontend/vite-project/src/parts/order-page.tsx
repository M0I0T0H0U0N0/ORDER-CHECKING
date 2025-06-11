import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./pagination";
import SearchBar from "./searchbar";

function CardHoverEffectDemo() {
  const [originalOrders, setOriginalOrders] = useState<any[]>([]);
  const [displayedOrders, setDisplayedOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Fetch all orders once
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/orders")
      .then((res) => {
        const data = res.data.results || res.data.orders || res.data;
        setOriginalOrders(data);
        setDisplayedOrders(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Slice data for current page
  const paginatedOrders = displayedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(displayedOrders.length / itemsPerPage);

  return (
    <div className="w-screen min-h-screen px-8 py-10 bg-black text-white flex flex-col">
      {/* Search + Filter */}
      <div className="w-full flex justify-start items-start gap-4 px-8 pt-4">
        <FilterButton
          setOrders={(filtered) => {
            setDisplayedOrders(filtered);
            setCurrentPage(1);
          }}
        />
        <SearchBar
          setOrders={(searched) => {
            setDisplayedOrders(searched);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Main Content with flexible space */}
      <div className="flex flex-col flex-grow justify-between items-center w-full mt-6">
        {/* Cards */}
        <div className="max-w-6xl w-full flex flex-col gap-6">
          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="w-full min-h-[200px] bg-gray-900 border border-green-500 rounded-2xl p-6 flex flex-row items-start gap-6 shadow-lg hover:shadow-green-500/50 transition duration-300"
            >
              <div className="w-40 h-40 bg-gray-800 rounded-xl overflow-hidden">
                {order.image ? (
                  <img
                    src={`http://127.0.0.1:8000${order.image}`}
                    alt="Order"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-green-400">
                    {order.customer_name}
                  </h2>
                  <p>📧 {order.email}</p>
                  <p>🗓️ Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                  <p>🛒 Order Item: {order.order_item}</p>
                </div>
                <div>
                  <p>💳 Payment: {order.payment_method}</p>
                  <p>💵 Total: ₹{order.total_amount}</p>
                  <p>🚚 Address: {order.shipping_address}</p>
                  <p>📌 Status: {order.status}</p>
                  <p>🕒 Updated: {new Date(order.last_updated).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Centered and at bottom */}
        <div className="mt-8 w-full flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default CardHoverEffectDemo;
