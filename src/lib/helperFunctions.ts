import { ImagesProps } from "components/ImageUploader/ImageUploader";
import { FILE_UPLOAD_MUTATION } from "graphql/mutations";
import { FilterState, ISUBCATEGORY } from "types/cat";
import { AdditionalInformation, IProduct, IProductFilter } from "types/prod";
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

  filtered = ProductsSorting(filtered || [], sortOption);

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
    { key: "Colours", productKey: "colors" },
    { key: "thicknesses", productKey: "thickness" },
    { key: "commercialWarranty", productKey: "CommmericallWarranty" },
    { key: "residentialWarranty", productKey: "ResidentialWarranty" },
    { key: "plankWidth", productKey: "plankWidth" },
    { key: "plankLength", productKey: "plankLength" }
  ];

  filterMapping.forEach(({ key, productKey }) => {
    if (selectedProductFilters[key].length > 0) {
      filtered = filtered?.filter(product => {
        const productValue = product[productKey];;
      
        if (Array.isArray(productValue)) {
          return productValue.some((val:AdditionalInformation) =>
            selectedProductFilters[key].includes(val?.name)
          );
        }
        else if (key === 'plankLength'){
          return selectedProductFilters[key].includes(product.sizes?.[0].height || "");
        }
      
        return selectedProductFilters[key].includes(productValue || "");
      })

      selectedProductFilters[key].forEach((value: string) => {
        appliedFilters.push({ name: key, value });
      });
    }
  });

  return { filtered: filtered || [], appliedFilters };
};


export const collectionFilter = ({
  products,
  priceValue,
  selectedProductFilters,
}: ProductFilterParams): { filtered: IProductFilter[]; appliedFilters: SelectedFilter[] } => {
  let filtered = products ?? [];

  const appliedFilters: SelectedFilter[] = [];

  // Filter by price
  filtered = filtered.filter(product => {
    const price = parseFloat(String(product?.price ?? 0));
    return price >= priceValue[0] && price <= priceValue[1];
  });

  const filterMapping: { key: keyof FilterState; productKey: string }[] = [
    { key: "thicknesses", productKey: "thickness" },
    { key: "plankWidth", productKey: "width" },
    { key: "plankLength", productKey: "height" }
  ];

  filterMapping.forEach(({ key, productKey }) => {
    const selectedValues = selectedProductFilters[key];
    if (Array.isArray(selectedValues) && selectedValues.length > 0) {
      filtered = filtered.filter(product => {
        const filterValue = product?.sizes?.[0]?.[productKey] ?? "";
        return selectedValues.includes(filterValue);
      });

      selectedValues.forEach(value => {
        appliedFilters.push({ name: key, value });
      });
    }
  });

  return { filtered, appliedFilters };
};


export const filterAndSort = (
  items: ISUBCATEGORY[],
  categoryName: string,
  urlIncludes: string
) =>
  items
    .filter(
      item =>
        item.category?.name === categoryName &&
        item.custom_url.includes(urlIncludes)
    )
    .sort((a, b) => Number(a.price) - Number(b.price));
    

    export const formatAED = (price: number | undefined | null): string => {
      if (!price || isNaN(price)) return "0.00";
      return price.toLocaleString("en-AE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };