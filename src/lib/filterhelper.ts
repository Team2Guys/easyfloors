import { filtervalues } from "data/filter";
import { Category, FilterState, ISUBCATEGORY } from "types/cat";
import { AdditionalInformation, IProduct } from "types/prod";
import { IfilterValues } from "types/type";


export const extractUniqueAttributes = (category: Category, sortedSubcategories?: ISUBCATEGORY[], isColection?: boolean) => {
  const commercialWarrantySet = new Set<string>();
  const residentialWarrantySet = new Set<string>();
  const thicknessSet = new Set<string>();
  const plankWidthSet = new Set<string>();
  const plankLengthSet = new Set<string>();
  const colorSet = new Set<string>();
  if (!isColection) {
    category.products?.forEach((product) => {
      if (product.thickness) thicknessSet.add(product.thickness.replace(/\s+/g, '').trim());
      if (product.CommmericallWarranty) commercialWarrantySet.add(product.CommmericallWarranty);
      if (product.ResidentialWarranty) residentialWarrantySet.add(product.ResidentialWarranty);
      if (product.plankWidth) plankWidthSet.add(product.plankWidth.replace(/\s+/g, '').trim());
      if (product.sizes && product.sizes[0].height) plankLengthSet.add(product.sizes[0].height.replace(/\s+/g, '').trim());
      if (product.colors) {
        product.colors.forEach((color: AdditionalInformation) => {
          colorSet.add(color.name.trim());
        });
      }
    });
  } else {
    sortedSubcategories?.forEach((category: ISUBCATEGORY) => {
      if (category.sizes && category.sizes[0].height) plankLengthSet.add(category.sizes[0].height.replace(/\s+/g, '').trim());
      if (category.sizes && category.sizes[0].width) plankWidthSet.add(category.sizes[0].width.replace(/\s+/g, '').trim());
      if (category.sizes && category.sizes[0].thickness) thicknessSet.add(category.sizes[0].thickness.replace(/\s+/g, '').trim());
    });
  }
  return {
    commercialWarrantySet,
    residentialWarrantySet,
    thicknessSet,
    plankWidthSet,
    plankLengthSet,
    colorSet
  }
};


export const getColorCount = (targetColor: string, category: Category): number => {
  return category.products?.filter((product: IProduct) =>
    product.colors?.some(color => color.name.trim().toLowerCase() === targetColor.toLowerCase())
  ).length || 0;
};


export const handleFilterSelection = (
  filterKey: keyof FilterState,
  value: string,
  setSelectedProductFilters: React.Dispatch<React.SetStateAction<FilterState>>
) => {
  // Normalize only for certain keys
  const normalizeKeys: (keyof FilterState)[] = ['thicknesses', 'plankWidth', 'plankLength'];
  const normalizedValue = normalizeKeys.includes(filterKey)
    ? value.replace(/\s+/g, '').trim()
    : value.trim();

  setSelectedProductFilters(prevFilters => {
    const currentValues = prevFilters[filterKey];
    const isSelected = currentValues.includes(normalizedValue);

    return {
      ...prevFilters,
      [filterKey]: isSelected
        ? currentValues.filter(item => item !== normalizedValue)
        : [...currentValues, normalizedValue],
    };
  });
};



export const handleClearFilter = (setPriceValue: React.Dispatch<React.SetStateAction<[number, number]>>, setSelectedProductFilters: React.Dispatch<React.SetStateAction<FilterState>>, setIsWaterProof: React.Dispatch<React.SetStateAction<boolean | null | undefined>>) => {
  setPriceValue([49, 149])
  setSelectedProductFilters({
    Colours: [],
    commercialWarranty: [],
    residentialWarranty: [],
    thicknesses: [],
    plankWidth: [],
    plankLength: []
  });
  setIsWaterProof(null)
}


export const filterProductsCountHanlder = (
  key: keyof IfilterValues,
  ValuesType: string,
  category: Category,
  sortedSubcategories?: ISUBCATEGORY[],
  isColection?: boolean
): number => {
  const normalizeIfNeeded = (k: keyof IfilterValues, value: string | undefined) => {
    if (!value) return '';
    const keysToNormalize: (keyof IfilterValues)[] = ['thicknesses', 'plankWidth', 'plankLength'];
    return keysToNormalize.includes(k) ? value.replace(/\s+/g, '').trim() : value.trim();
  };

  const normalizedTargetValue = normalizeIfNeeded(key, ValuesType);

  if (isColection) {
    const filtered = sortedSubcategories?.filter((subcategory) => {
      const size = subcategory.sizes?.[0];
      if (!size) return false;

      if (key === 'thicknesses') {
        return normalizeIfNeeded(key, size.thickness) === normalizedTargetValue;
      } else if (key === 'plankWidth') {
        return normalizeIfNeeded(key, size.width) === normalizedTargetValue;
      } else if (key === 'plankLength') {
        return normalizeIfNeeded(key, size.height) === normalizedTargetValue;
      }
      return false;
    });

    return filtered?.length || 0;
  }

  const filtered = category.products?.filter((product: IProduct) => {
    if (key === 'plankLength') {
      const size = product.sizes?.[0];
      return normalizeIfNeeded(key, size?.height) === normalizedTargetValue;
    } else if (key === 'plankWidth' || key === 'thicknesses') {
      const rawValue = product[filtervalues[key] as keyof IProduct] as string | undefined;
      return normalizeIfNeeded(key, rawValue) === normalizedTargetValue;
    }

    // default (non-size filters)
    const rawValue = product[filtervalues[key] as keyof IProduct] as string | undefined;
    return rawValue?.trim() === ValuesType.trim();
  });

  return filtered?.length || 0;
};
