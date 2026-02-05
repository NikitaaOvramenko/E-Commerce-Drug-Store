import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import Select from "react-select";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { adminBrandsApi, adminTypesApi } from "../../api/endpoints/admin";
import type { DrugType, Brand } from "../../api/types/drug.types";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

interface SelectOption {
  value: number;
  label: string;
}

export default function AdminTypesPage() {
  const { textColor, hintColor, secondaryBgColor, bgColor, buttonColor } =
    useTelegramTheme();

  const [types, setTypes] = useState<DrugType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editBrandIds, setEditBrandIds] = useState<SelectOption[]>([]);
  const [newName, setNewName] = useState("");
  const [newBrandIds, setNewBrandIds] = useState<SelectOption[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const brandOptions: SelectOption[] = brands.map((b) => ({
    value: b.id,
    label: b.name,
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

  const fetchTypes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminTypesApi.getAll();
      setTypes(data);
    } catch (error) {
      console.error("Failed to fetch types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    try {
      const data = await adminBrandsApi.getAll();
      setBrands(data);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  }, []);

  useEffect(() => {
    fetchTypes();
    fetchBrands();
  }, [fetchTypes, fetchBrands]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await adminTypesApi.create({
        name: newName.trim(),
        brandIds: newBrandIds.map((b) => b.value),
      });
      setNewName("");
      setNewBrandIds([]);
      setShowAdd(false);
      fetchTypes();
    } catch (error) {
      console.error("Failed to add type:", error);
    }
  };

  const handleEdit = async (id: number) => {
    if (!editName.trim()) return;
    try {
      await adminTypesApi.update(id, {
        name: editName.trim(),
        brandIds: editBrandIds.map((b) => b.value),
      });
      setEditId(null);
      setEditName("");
      setEditBrandIds([]);
      fetchTypes();
    } catch (error) {
      console.error("Failed to update type:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminTypesApi.delete(id);
      setDeleteId(null);
      fetchTypes();
    } catch (error) {
      console.error("Failed to delete type:", error);
    }
  };

  const startEdit = (type: DrugType) => {
    setEditId(type.id);
    setEditName(type.name);
    // Convert brandIds to SelectOption format
    const selectedBrands = (type.brandIds || [])
      .map((id) => {
        const brand = brands.find((b) => b.id === id);
        return brand ? { value: brand.id, label: brand.name } : null;
      })
      .filter((b): b is SelectOption => b !== null);
    setEditBrandIds(selectedBrands);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>
            Types
          </h1>
          <p className="text-sm mt-1" style={{ color: hintColor }}>
            Manage drug types/categories
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus size={20} />
          Add Type
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
            placeholder="Type name"
            bgColor={bgColor}
            textColor={textColor}
            hintColor={hintColor}
            accentColor={buttonColor}
          />

          <Select
            isMulti
            options={brandOptions}
            value={newBrandIds}
            onChange={(selected) => setNewBrandIds(selected as SelectOption[])}
            placeholder="Select brands (optional)"
            styles={selectStyles}
            classNamePrefix="select"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 py-3 rounded-xl font-medium"
              style={{ backgroundColor: buttonColor, color: bgColor }}
            >
              Add Type
            </button>
            <button
              onClick={() => {
                setShowAdd(false);
                setNewName("");
                setNewBrandIds([]);
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
        ) : types.length === 0 ? (
          <div className="p-8 text-center" style={{ color: hintColor }}>
            No types found. Add your first type!
          </div>
        ) : (
          <ul>
            {types.map((type) => (
              <li
                key={type.id}
                className="p-4 border-b last:border-b-0"
                style={{ borderColor: `${hintColor}20` }}
              >
                {editId === type.id ? (
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
                      options={brandOptions}
                      value={editBrandIds}
                      onChange={(selected) =>
                        setEditBrandIds(selected as SelectOption[])
                      }
                      placeholder="Select brands (optional)"
                      styles={selectStyles}
                      classNamePrefix="select"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(type.id)}
                        className="p-2 rounded-lg"
                        style={{ color: buttonColor }}
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditName("");
                          setEditBrandIds([]);
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
                      <span style={{ color: textColor }}>{type.name}</span>
                      {type.brandNames && type.brandNames.length > 0 && (
                        <p className="text-xs mt-1" style={{ color: hintColor }}>
                          Brands: {type.brandNames.join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(type)}
                        className="p-2 rounded-lg"
                        style={{ color: hintColor }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteId(type.id)}
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
              Delete Type?
            </h2>
            <p className="mb-6" style={{ color: hintColor }}>
              This may affect drugs using this type.
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
