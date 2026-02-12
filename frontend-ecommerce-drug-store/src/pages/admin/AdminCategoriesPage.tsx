import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { adminCategoriesApi } from "../../api/endpoints/admin";
import type { Category } from "../../api/types/drug.types";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function AdminCategoriesPage() {
  const { textColor, hintColor, secondaryBgColor, bgColor, buttonColor } = useTelegramTheme();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [newName, setNewName] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminCategoriesApi.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await adminCategoriesApi.create({ name: newName.trim() });
      setNewName("");
      setShowAdd(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleEdit = async (id: number) => {
    if (!editName.trim()) return;
    try {
      await adminCategoriesApi.update(id, { name: editName.trim() });
      setEditId(null);
      setEditName("");
      fetchCategories();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminCategoriesApi.delete(id);
      setDeleteId(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const startEdit = (category: Category) => {
    setEditId(category.id);
    setEditName(category.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>
            Categories
          </h1>
          <p className="text-sm mt-1" style={{ color: hintColor }}>
            Manage product categories
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus size={20} />
          Add Category
        </Button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ backgroundColor: secondaryBgColor }}
        >
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Category name"
            className="flex-1"
            bgColor={bgColor}
            textColor={textColor}
            hintColor={hintColor}
            accentColor={buttonColor}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            className="p-3 rounded-xl"
            style={{ backgroundColor: buttonColor, color: bgColor }}
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => {
              setShowAdd(false);
              setNewName("");
            }}
            className="p-3 rounded-xl"
            style={{ color: hintColor }}
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* List */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{ backgroundColor: secondaryBgColor, borderColor: `${hintColor}30` }}
      >
        {loading ? (
          <div className="p-8 text-center" style={{ color: hintColor }}>
            Loading...
          </div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center" style={{ color: hintColor }}>
            No categories found. Add your first category!
          </div>
        ) : (
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between p-4 border-b last:border-b-0"
                style={{ borderColor: `${hintColor}20` }}
              >
                {editId === category.id ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1"
                      bgColor={bgColor}
                      textColor={textColor}
                      hintColor={hintColor}
                      accentColor={buttonColor}
                      onKeyDown={(e) => e.key === "Enter" && handleEdit(category.id)}
                    />
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="p-2 rounded-lg"
                      style={{ color: buttonColor }}
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setEditId(null);
                        setEditName("");
                      }}
                      className="p-2 rounded-lg"
                      style={{ color: hintColor }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span style={{ color: textColor }}>{category.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(category)}
                        className="p-2 rounded-lg"
                        style={{ color: hintColor }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteId(category.id)}
                        className="p-2 rounded-lg"
                        style={{ color: "#ef4444" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="rounded-2xl p-6 max-w-sm w-full"
            style={{ backgroundColor: secondaryBgColor }}
          >
            <h2 className="text-lg font-bold mb-2" style={{ color: textColor }}>
              Delete Category?
            </h2>
            <p className="mb-6" style={{ color: hintColor }}>
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDeleteId(null)} fullWidth>
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
