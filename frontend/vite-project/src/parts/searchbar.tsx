import { useState, useEffect, useRef } from "react";
import axios from "axios";

const PARAMETERS = ["customer-name", "email", "order-item", "shipping-address"];

interface SearchBarProps {
  setOrders: (orders: any[]) => void;
}

function SearchBar({ setOrders }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParam, setSelectedParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!inputRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const parseSearch = (search: string) => {
    const [param, ...rest] = search.split(":");
    const value = rest.join(":").trim();
    return { param: param.trim(), value };
  };

  const handleSearch = async () => {
    const { param, value } = parseSearch(searchTerm);
    if (!PARAMETERS.includes(param) || !value) return;

    console.log(`Searching for orders where ${param} = '${value}'`);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/orders/?search=${value}`);
      const dataArray = response.data.results || response.data.orders || response.data;

      const filtered = dataArray.filter((item: any) =>
        item[param]?.toLowerCase().includes(value.toLowerCase())
      );

      console.log("Matched orders:", filtered); // ✅ log matched items

      setOrders(filtered);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectParam = (param: string) => {
    setSelectedParam(param);
    setSearchTerm(param + ": ");
    setShowDropdown(false);
  };

  return (
    <div className="w-full flex justify-end pr-8 pt-4 space-x-4 relative" ref={inputRef}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search projects..."
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyDown}
        className="w-80 px-4 py-2 rounded-xl text-white placeholder-white bg-transparent border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {showDropdown && !selectedParam && (
        <div className="absolute top-full mt-1 right-0 w-80 bg-black border border-green-500 rounded-lg shadow-md z-10">
          {PARAMETERS.map((param) => (
            <div
              key={param}
              onClick={() => handleSelectParam(param)}
              className="px-4 py-2 hover:bg-green-600 cursor-pointer text-white"
            >
              {param}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;







     
