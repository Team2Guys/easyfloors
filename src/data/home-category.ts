export const getSubcategoryOrder = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("polar spc herringbone")) return 1;
    if (lower.includes("polar spc")) return 2;
    if (lower.includes("polar lvt")) return 3;
    if (lower.includes("richmond spc herringbone")) return 5;
    if (lower.includes("richmond spc prime")) return 4;
    if (lower.includes("richmond spc eco")) return 3;
    if (lower.includes("richmond spc")) return 4;
    if (lower.includes("richmond lvt")) return 6;
  
    return 999;
  };