import { useLayoffData } from "../hooks/useLayoffData";
import { Search } from "lucide-react"; // Import the search icon
import { companyLogos } from "../data/companyLogos";

const LayoffTable = () => {
  const data = useLayoffData(); // Fetch the CSV data using the custom hook

  if (data.length === 0) {
    return <div>Loading...</div>; // Loading state while the data is being fetched
  }

  // Get the headers dynamically from the first row of CSV and add a new "Google Search" column
  const headers = ["date", ...Object.keys(data[0]).filter((key) => key !== "date"), "googleSearch"];

  // Utility function to convert strings to camel case
  const toCamelCase = (str: string) => {
    return str
      .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""))
      .replace(/^[a-z]/, (group) => group.toUpperCase());
  };

  return (
    <div className="table-container my-4">
      <div
        className="overflow-x-auto"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header} className="border px-4 py-2 font-semibold">
                  {header === "googleSearch"
                    ? "Google"
                    : header === "headquarters" // Rename "headquarters" to "City"
                    ? "City"
                    : toCamelCase(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {headers.map((header) => (
                  <td key={header} className="border px-4 py-2">
                    {header === "company" ? (
                        <div className="flex items-center">
                          <img
                          src={
                            row.company === "MITRE"
                            ? "https://logo.clearbit.com/mitre.org"
                            : `https://logo.clearbit.com/${row.company.toLowerCase().replace(/\s+/g, '')}.com`
                          }
                          alt={`${row.company} logo`}
                          className="w-6 h-6 mr-2"
                          />
                          {row.company}
                        </div>
                    ) : header === "date" ? (
                      row[header]
                    ) : header === "googleSearch" ? (
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(
                          `${row.company} ${row.headquarters} layoffs`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 flex items-center justify-center"
                      >
                        <Search className="w-5 h-5" /> {/* Search icon */}
                      </a>
                    ) : (
                      row[header]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LayoffTable;
