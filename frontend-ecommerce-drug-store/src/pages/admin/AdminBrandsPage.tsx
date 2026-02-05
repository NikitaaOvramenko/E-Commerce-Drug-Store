import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import Select from "react-select";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { adminBrandsApi, adminTypesApi } from "../../api/endpoints/admin";
import type { Brand, DrugType } from "../../api/types/drug.types";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

interface SelectOption {
  value: number;
  label: string;
}

export default function AdminBrandsPage() {
  const { textColor, hintColor, secondaryBgColor, bgColor, buttonColor } =
    useTelegramTheme();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<DrugType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editTypeIds, setEditTypeIds] = useState<SelectOption[]>([]);
  const [newName, setNewName] = useState("");
  const [newTypeIds, setNewTypeIds] = useState<SelectOption[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const typeOptions: SelectOption[] = types.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const selectStyles = {
    control: (base: object) => ({
      ...base,
      backgroundColor: bgColor,
      borderColor: `${hintColor}40`,
      borderWidth: 2,
      borderRadius: "0.75rem",
      padding: "0.25rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: buttonColor,
      },
    }),
    menu: (base: object) => ({
      ...base,
      backgroundColor: bgColor,
      borderRadius: "0.75rem",
      border: `1px solid ${hintColor}40`,
    }),
    option: (base: object, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected
        ? buttonColor
        : state.isFocused
        ? `${buttonColor}20`
        : "transparent",
      color: state.isSelected ? bgColor : textColor,
      "&:active": {
        backgroundColor: `${buttonColor}40`,
      },
    }),
    multiValue: (base: object) => ({
      ...base,
      backgroundColor: `${buttonColor}20`,
      borderRadius: "0.5rem",
    }),
    multiValueLabel: (base: object) => ({
      ...base,
      color: textColor,
    }),
    multiValueRemove: (base: object) => ({
      ...base,
      color: hintColor,
      "&:hover": {
        backgroundColor: `${buttonColor}40`,
        color: textColor,
      },
    }),
    input: (base: object) => ({
      ...base,
      color: textColor,
    }),
    placeholder: (base: object) => ({
      ...base,
      color: hintColor,
    }),
    singleValue: (base: object) => ({
      ...base,
      color: textColor,
    }),
  };

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminBrandsApi.getAll();
      setBrands(data);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTypes = useCallback(async () => {
    try {
      const data = await adminTypesApi.getAll();
      setTypes(data);
    } catch (error) {
      console.error("Failed to fetch types:", error);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
    fetchTypes();
  }, [fetchBrands, fetchTypes]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await adminBrandsApi.create({
        name: newName.trim(),
        typeIds: newTypeIds.map((t) => t.value),
      });
      setNewName("");
      setNewTypeIds([]);
      setShowAdd(false);
      fetchBrands();
    } catch (error) {
      console.error("Failed to add brand:", error);
    }
  };

  const handleEdit = async (id: number) => {
    if (!editName.trim()) return;
    try {
      await adminBrandsApi.update(id, {
        name: editName.trim(),
        typeIds: editTypeIds.map((t) => t.value),
      });
      setEditId(null);
      setEditName("");
      setEditTypeIds([]);
      fetchBrands();
    } catch (error) {
      console.error("Failed to update brand:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminBrandsApi.delete(id);
      setDeleteId(null);
      fetchBrands();
    } catch (error) {
      console.error("Failed to delete brand:", error);
    }
  };

  const startEdit = (brand: Brand) => {
    setEditId(brand.id);
    setEditName(brand.name);
    // Convert typeIds to SelectOption format
    const selectedTypes = (brand.typeIds || [])
      .map((id) => {
        const type = types.find((t) => t.id === id);
        return type ? { value: type.id, label: type.name } : null;
      })
      .filter((t): t is SelectOption => t !== null);
    setEditTypeIds(selectedTypes);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>
            Brands
          </h1>
          <p className="text-sm mt-1" style={{ color: hintColor }}>
            Manage drug brands/manufacturers
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus size={20} />
          Add Brand
        </Button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div
          className="rounded-xl p-4 space-y-3"
          style={{ backgroundColor: secondaryBgColor }}
        >
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Brand name"
            bgColor={bgColor}
            textColor={textColor}
            hintColor={hintColor}
            accentColor={buttonColor}
          />

          <Select
            isMulti
            options={typeOptions}
            value={newTypeIds}
            onChange={(selected) => setNewTypeIds(selected as SelectOption[])}
            placeholder="Select types (optional)"
            styles={selectStyles}
            classNamePrefix="select"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 py-3 rounded-xl font-medium"
              style={{ backgroundColor: buttonColor, color: bgColor }}
            >
              Add Brand
            </button>
            <button
              onClick={() => {
                setShowAdd(false);
                setNewName("");
                setNewTypeIds([]);
              }}
              className="py-3 px-4 rounded-xl"
              style={{ color: hintColor }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{
          backgroundColor: secondaryBgColor,
          borderColor: `${hintColor}30`,
        }}
      >
        {loading ? (
          <div className="p-8 text-center" style={{ color: hintColor }}>
            Loading...
          </div>
        ) : brands.length === 0 ? (
          <div className="p-8 text-center" style={{ color: hintColor }}>
            No brands found. Add your first brand!
          </div>
        ) : (
          <ul>
            {brands.map((brand) => (
              <li
                key={brand.id}
                className="p-4 border-b last:border-b-0"
                style={{ borderColor: `${hintColor}20` }}
              >
                {editId === brand.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      bgColor={bgColor}
                      textColor={textColor}
                      hintColor={hintColor}
                      accentColor={buttonColor}
                    />

                    <Select
                      isMulti
                      options={typeOptions}
                      value={editTypeIds}
                      onChange={(selected) =>
                        setEditTypeIds(selected as SelectOption[])
                      }
                      placeholder="Select types (optional)"
                      styles={selectStyles}
                      classNamePrefix="select"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(brand.id)}
                        className="p-2 rounded-lg"
                        style={{ color: buttonColor }}
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditName("");
                          setEditTypeIds([]);
                        }}
                        className="p-2 rounded-lg"
                        style={{ color: hintColor }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <span style={{ color: textColor }}>{brand.name}</span>
                      {brand.typeNames && brand.typeNames.length > 0 && (
                        <p className="text-xs mt-1" style={{ color: hintColor }}>
                          Types: {brand.typeNames.join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(brand)}
                        className="p-2 rounded-lg"
                        style={{ color: hintColor }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteId(brand.id)}
                        className="p-2 rounded-lg"
                        style={{ color: "#ef4444" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
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
              Delete Brand?
            </h2>
            <p className="mb-6" style={{ color: hintColor }}>
              This may affect drugs using this brand.
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
