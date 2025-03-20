import { ImagesProps } from "components/ImageUploader/ImageUploader";
import { FILE_UPLOAD_MUTATION } from "graphql/mutations";
import { FilterState } from "types/cat";
import { IProduct } from "types/prod";
import { ProductFilterParams, SelectedFilter } from "types/types";
import { ProductsSorting } from "utils/helperFunctions";

export const uploadPhotosToBackend = async (files: File[]) => {
  if (files.length === 0) throw new Error('No files found');

  const Response_data: ImagesProps[] = [];

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append("operations", JSON.stringify({
        query: FILE_UPLOAD_MUTATION,
        variables: { file: null },

      })
      );
      formData.append("map", JSON.stringify({ file: ["variables.file"] }));
      formData.append("file", file);
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL || "", {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const result = await response.json();
      if (result.data) {
        Response_data.push(result.data.createFileUploading)
      }
    }

    return Response_data;

  } catch (error) {
    throw error;
  }
};


export const productFilter = ({
  products,
  priceValue,
  sortOption,
  selectedProductFilters,
  isWaterProof,
  subcategory,
}: ProductFilterParams): { filtered: IProduct[]; appliedFilters: SelectedFilter[] } => {
  let filtered = products;

  if (subcategory) {
    filtered = filtered?.filter(
      product => product.subcategory?.custom_url === subcategory
    );
  }

  ProductsSorting(filtered || [], sortOption);

  filtered = filtered?.filter(product => {
    const price = parseFloat(String(product.price));
    return price >= priceValue[0] && price <= priceValue[1];
  });

  const appliedFilters: SelectedFilter[] = [];

  if (isWaterProof === true || isWaterProof === false) {
    filtered = filtered?.filter(product => product.waterproof === isWaterProof);
    appliedFilters.push({ name: "isWaterProof", value: isWaterProof });
  }

  const filterMapping: { key: keyof FilterState; productKey: string }[] = [
    { key: "colors", productKey: "colors" },
    { key: "thicknesses", productKey: "thickness" },
    { key: "commercialWarranty", productKey: "CommmericallWarranty" },
    { key: "residentialWarranty", productKey: "ResidentialWarranty" },
    { key: "plankWidth", productKey: "plankWidth" },
  ];

  filterMapping.forEach(({ key, productKey }) => {
    if (selectedProductFilters[key].length > 0) {
      filtered = filtered?.filter(product =>
        selectedProductFilters[key].includes((product[productKey] || ""))
      );
      selectedProductFilters[key].forEach((value: string) => {
        appliedFilters.push({ name: key, value });
      });
    }
  });

  return { filtered: filtered || [], appliedFilters };
};
