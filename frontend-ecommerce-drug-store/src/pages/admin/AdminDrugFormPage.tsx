import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTelegramTheme } from "../../hooks/useTelegramTheme";
import { drugsApi } from "../../api/endpoints/drugs.api";
import { adminDrugsApi } from "../../api/endpoints/admin";
import type {
  DrugType,
  Brand,
  CreateDrugRequest,
} from "../../api/types/drug.types";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function AdminDrugFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = id && id !== "new";
  const navigate = useNavigate();
  const { textColor, hintColor, secondaryBgColor, bgColor, buttonColor } =
    useTelegramTheme();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [types, setTypes] = useState<DrugType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [form, setForm] = useState<CreateDrugRequest>({
    name: "",
    price: 0,
    stock: 0,
    img: "",
    typeId: 0,
    brandId: 0,
  });

  // Load types and brands
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [typesData, brandsData] = await Promise.all([
          drugsApi.getTypes(),
          drugsApi.getBrands(),
        ]);
        setTypes(typesData);
        setBrands(brandsData);
      } catch (error) {
        console.error("Failed to load options:", error);
      }
    };

    loadOptions();
  }, []);

  // Load drug if editing
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      drugsApi
        .getById(Number(id))
        .then((drug) => {
          setForm({
            name: drug.name,
            price: drug.price / 100,
            stock: drug.stock,
            img: drug.img,
            typeId: drug.typeId,
            brandId: drug.brandId,
          });
        })
        .catch((error) => {
          console.error("Failed to load drug:", error);
          navigate("/admin/drugs");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = form.img;

      // Upload image if a new one is selected
      if (image) {
        // Get presigned URL from backend
        const presignedUrl = await adminDrugsApi.getPresignedUrl(image.name);

        // Upload to S3/storage using presigned URL
        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        // Extract the base URL (without query params) as the final image URL
        imageUrl = presignedUrl.split("?")[0];
      }

      const drugData = {
        ...form,
        img: imageUrl,
        price: Math.round(form.price * 100),
      };

      if (isEdit) {
        await adminDrugsApi.update(Number(id), drugData);
      } else {
        await adminDrugsApi.create(drugData);
      }
      navigate("/admin/drugs");
    } catch (error) {
      console.error("Failed to save drug:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    field: keyof CreateDrugRequest,
    value: string | number,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imgUrl = URL.createObjectURL(file);
      setImagePreview(imgUrl);
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-64"
        style={{ color: hintColor }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/drugs")}
          className="p-2 rounded-lg"
          style={{ color: hintColor }}
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textColor }}>
            {isEdit ? "Edit Drug" : "Add Drug"}
          </h1>
          <p className="text-sm mt-1" style={{ color: hintColor }}>
            {isEdit ? "Update drug information" : "Add a new drug to inventory"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className="rounded-xl p-6 space-y-4"
          style={{ backgroundColor: secondaryBgColor }}
        >
          {/* Name */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: textColor }}
            >
              Name *
            </label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Drug name"
              required
              bgColor={bgColor}
              textColor={textColor}
              hintColor={hintColor}
              accentColor={buttonColor}
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Price ($) *
              </label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value))
                }
                placeholder="0"
                step={"0.01"}
                required
                bgColor={bgColor}
                textColor={textColor}
                hintColor={hintColor}
                accentColor={buttonColor}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Stock *
              </label>
              <Input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) =>
                  handleChange("stock", parseInt(e.target.value))
                }
                placeholder="0"
                required
                bgColor={bgColor}
                textColor={textColor}
                hintColor={hintColor}
                accentColor={buttonColor}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: textColor }}
            >
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full py-2 px-3 rounded-xl border-2"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: `${hintColor}40`,
              }}
            />
            {(imagePreview || form.img) && (
              <img
                src={imagePreview || form.img}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>

          {/* Type & Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Type *
              </label>
              <select
                value={form.typeId}
                onChange={(e) =>
                  handleChange("typeId", parseInt(e.target.value))
                }
                required
                className="w-full py-3.5 px-4 rounded-xl border-2 outline-none"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  borderColor: `${hintColor}40`,
                }}
              >
                <option value={0}>Select type</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Brand *
              </label>
              <select
                value={form.brandId}
                onChange={(e) =>
                  handleChange("brandId", parseInt(e.target.value))
                }
                required
                className="w-full py-3.5 px-4 rounded-xl border-2 outline-none"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  borderColor: `${hintColor}40`,
                }}
              >
                <option value={0}>Select brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate("/admin/drugs")}
            fullWidth
          >
            Cancel
          </Button>
          <Button type="submit" loading={saving} fullWidth>
            {isEdit ? "Update Drug" : "Add Drug"}
          </Button>
        </div>
      </form>
    </div>
  );
}
