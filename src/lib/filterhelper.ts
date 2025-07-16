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
      if (product.thickness) thicknessSet.add(product.thickness);
      if (product.CommmericallWarranty) commercialWarrantySet.add(product.CommmericallWarranty);
      if (product.ResidentialWarranty) residentialWarrantySet.add(product.ResidentialWarranty);
      if (product.plankWidth) plankWidthSet.add(product.plankWidth);
      if (product.sizes && product.sizes[0].height) plankLengthSet.add(product.sizes[0].height);
      if (product.colors) {
        product.colors.forEach((color: AdditionalInformation) => {
          colorSet.add(color.name.trim());
        });
      }
    });
  } else {
    sortedSubcategories?.forEach((category: ISUBCATEGORY) => {
      if (category.sizes && category.sizes[0].height) plankLengthSet.add(category.sizes[0].height);
      if (category.sizes && category.sizes[0].width) plankWidthSet.add(category.sizes[0].width);
      if (category.sizes && category.sizes[0].thickness) thicknessSet.add(category.sizes[0].thickness);
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


export const handleFilterSelection = (filterKey: keyof FilterState, value: string, setSelectedProductFilters: React.Dispatch<React.SetStateAction<FilterState>>) => {
  setSelectedProductFilters(prevFilters => ({
    ...prevFilters,
    [filterKey]: prevFilters[filterKey].includes(value)
      ? prevFilters[filterKey].filter(item => item !== value)
      : [...prevFilters[filterKey], value],
  }));
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


export const filterProductsCountHanlder = (key: keyof IfilterValues, ValuesType: string, category: Category, sortedSubcategories?: ISUBCATEGORY[], isColection?: boolean) => {
  if (isColection) {
    const filterprod = sortedSubcategories?.filter((product: ISUBCATEGORY) => {
      if (key === 'thicknesses') {
        const values = product.sizes?.[0].thickness
        return values == ValuesType;
      } else if (key === 'plankWidth') {
        const values = product.sizes?.[0].width
        return values == ValuesType;
      } else if (key === 'plankLength') {
        const values = product.sizes?.[0].height
        return values == ValuesType;
      }

    })

    return filterprod?.length || 0
  }
  const filterprod = category?.products?.filter((product: IProduct) => {
    if (key === 'plankLength') {
      const values = product.sizes?.[0].height
      return values == ValuesType;
    }
    const values = product[filtervalues[key] as keyof IProduct]
    return values == ValuesType;
  })

  return filterprod?.length || 0


}