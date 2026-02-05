import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { drugsApi } from "../../api/endpoints/drugs.api";
import { adminDrugsApi } from "../../api/endpoints/admin";
import type { Drug, DrugPage } from "../../api/types/drug.types";
import Button from "../../components/ui/Button";

export default function AdminDrugsPage() {
  const { textColor, hintColor, secondaryBgColor, buttonColor } =
    useTelegramTheme();
  const navigate = useNavigate();

  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchDrugs = useCallback(async () => {
    setLoading(true);
    try {
      const data: DrugPage = await drugsApi.getAll({ page, size: 10 });
      setDrugs(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch drugs:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchDrugs();
  }, [fetchDrugs]);

  const handleDelete = async (id: number) => {
    try {
      await adminDrugsApi.delete(id);
      fetchDrugs();
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete drug:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>
            Drugs
          </h1>
          <p className="text-sm mt-1" style={{ color: hintColor }}>
            Manage your drug inventory
          </p>
        </div>
        <Button onClick={() => navigate("/admin/drugs/new")}>
          <Plus size={20} />
          Add Drug
        </Button>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{
          backgroundColor: secondaryBgColor,
          borderColor: `${hintColor}30`,
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ borderColor: `${hintColor}30` }} className="border-b">
              <th
                className="text-left p-4 font-medium"
                style={{ color: hintColor }}
              >
                Image
              </th>
              <th
                className="text-left p-4 font-medium"
                style={{ color: hintColor }}
              >
                Name
              </th>
              <th
                className="text-left p-4 font-medium"
                style={{ color: hintColor }}
              >
                Price
              </th>
              <th
                className="text-left p-4 font-medium"
                style={{ color: hintColor }}
              >
                Stock
              </th>
              <th
                className="text-left p-4 font-medium"
                style={{ color: hintColor }}
              >
                Type
              </th>
              <th
                className="text-left p-4 font-medium"
                style={{ color: hintColor }}
              >
                Brand
              </th>
              <th
                className="text-right p-4 font-medium"
                style={{ color: hintColor }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center"
                  style={{ color: hintColor }}
                >
                  Loading...
                </td>
              </tr>
            ) : drugs.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center"
                  style={{ color: hintColor }}
                >
                  No drugs found. Add your first drug!
                </td>
              </tr>
            ) : (
              drugs.map((drug) => (
                <tr
                  key={drug.id}
                  className="border-b last:border-b-0"
                  style={{ borderColor: `${hintColor}20` }}
                >
                  <td className="p-4">
                    <img
                      src={drug.img || "/placeholder-drug.png"}
                      alt={drug.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      style={{ backgroundColor: `${hintColor}20` }}
                    />
                  </td>
                  <td className="p-4" style={{ color: textColor }}>
                    {drug.name}
                  </td>
                  <td className="p-4" style={{ color: buttonColor }}>
                    ${drug.price}
                  </td>
                  <td
                    className="p-4"
                    style={{ color: drug.stock > 0 ? textColor : "#ef4444" }}
                  >
                    {drug.stock}
                  </td>
                  <td className="p-4" style={{ color: hintColor }}>
                    {drug.typeName}
                  </td>
                  <td className="p-4" style={{ color: hintColor }}>
                    {drug.brandName}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/drugs/${drug.id}`)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: hintColor }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteId(drug.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "#ef4444" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-lg disabled:opacity-50"
            style={{ color: hintColor }}
          >
            <ChevronLeft size={20} />
          </button>
          <span style={{ color: textColor }}>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-lg disabled:opacity-50"
            style={{ color: hintColor }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="rounded-2xl p-6 max-w-sm w-full"
            style={{ backgroundColor: secondaryBgColor }}
          >
            <h2 className="text-lg font-bold mb-2" style={{ color: textColor }}>
              Delete Drug?
            </h2>
            <p className="mb-6" style={{ color: hintColor }}>
              This action cannot be undone. The drug will be permanently
              removed.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                fullWidth
              >
                Cancel
              </Button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 px-4 rounded-xl font-medium"
                style={{ backgroundColor: "#ef4444", color: "#ffffff" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
