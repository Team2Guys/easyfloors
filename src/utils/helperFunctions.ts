

import axios from 'axios';
import React from 'react';
import { FILE_DELETION_MUTATION } from 'graphql/mutations';
import { IProduct, ProductImage } from 'types/prod';
import { Category } from 'types/cat';

export const ImageRemoveHandler = async (imagePublicId: string, setterFunction: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
  finalToken?: string
) => {
  try {
    await axios.post(process.env.NEXT_PUBLIC_BASE_URL || "",
      {
        query: FILE_DELETION_MUTATION,
        variables: {
          public_id: imagePublicId,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${finalToken}`,
        },
        withCredentials: true,
      }
    );


    setterFunction((prev) => prev?.filter((item) => item.public_id !== imagePublicId));

  } catch (error) {
    throw error;
  }
};


export const handleImageAltText = (
    index: number,
    newImageIndex: string,
    setImagesUrlhandler: React.Dispatch<
      React.SetStateAction<ProductImage[] | undefined>
    >,
    variantType: string
  ) => {
    setImagesUrlhandler((prev: ProductImage[] | undefined) => {
      if (!prev) return [];

      const updatedImagesUrl = prev?.map((item: ProductImage, i: number) =>
        i === index ? { ...item, [variantType]: newImageIndex } : item
      );
      return updatedImagesUrl;
    });
  };


export const TrimerHandler = (value: string) => {
  if (!value) return

  return value.trim().toLowerCase()



}


export const ProductsSorting = (filtered: IProduct[], sortOption: string): IProduct[] => {
  const clone = [...filtered];

  const getSortablePart = (name: string) => {
    const parts = name.split(" - ");
    return parts.length > 1 ? parts[1] : name;
  };

  switch (sortOption) {
    case "A to Z":
      return clone.sort((a, b) => {
        if (!a.name || !b.name) return 0;
        const nameA = getSortablePart(a.name);
        const nameB = getSortablePart(b.name);
        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
      });

    case "Z to A":
      return clone.sort((a, b) => {
        if (!a.name || !b.name) return 0;
        const nameA = getSortablePart(a.name);
        const nameB = getSortablePart(b.name);
        return nameB.localeCompare(nameA, undefined, { sensitivity: 'base' });
      });

    case "Low to High":
      return clone.sort((a, b) => a.price - b.price);

    case "High to Low":
      return clone.sort((a, b) => b.price - a.price);

    default:
      return filtered;
  }
};


export function getExpectedDeliveryDate(
  shippingMethod: "Standard Shipping" | "Express Shipping" | "Self Collect",
  orderTime: Date
): string {
  const orderHour = orderTime.getHours();
  const currentDate = new Date(orderTime);

  if (shippingMethod === "Express Shipping") {
    currentDate.setDate(currentDate.getDate() + (orderHour < 13 ? 1 : 2));
    return `Expected delivery within 1 day i.e;  ${formatDate(currentDate)}`;
  }

  else if (shippingMethod === "Standard Shipping") {
    let daysToAdd = 0;
    const deliveryDates: string[] = [];
    currentDate.setDate(currentDate.getDate() + 1);

    while (daysToAdd < 2) {
      currentDate.setDate(currentDate.getDate() + 1);

      if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
        deliveryDates.push(formatDate(new Date(currentDate)));
        daysToAdd++;
      }
    }

    return "Expected delivery within 2-3 days i.e;" + deliveryDates.join(" to ");
  }

  const newDate = new Date(currentDate.setDate(currentDate.getDate() + 2))
  const twoDayEarlierDate = new Date(currentDate.setDate(currentDate.getDate() + 1))

  return "Available for self collection within 2-3 days i.e:" + formatDate(newDate) + " to " + formatDate(twoDayEarlierDate);
}



export function trackingOrder(
  shippingMethod: "Standard Shipping" | "Express Shipping" | "Self Collect",
  orderTime: Date
): string {
  const orderHour = orderTime.getHours();
  const currentDate = new Date(orderTime);

  if (shippingMethod === "Express Shipping") {
    currentDate.setDate(currentDate.getDate() + (orderHour < 13 ? 1 : 2));
    return formatDate(currentDate);
  }

  else if (shippingMethod === "Standard Shipping") {
    let daysToAdd = 0;
    const deliveryDates: string[] = [];
    currentDate.setDate(currentDate.getDate() + 1);

    while (daysToAdd < 2) {
      currentDate.setDate(currentDate.getDate() + 1);

      if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
        deliveryDates.push(formatDate(new Date(currentDate)));
        daysToAdd++;
      }
    }

    return deliveryDates.join(" to ");
  }

  const newDate = new Date(currentDate.setDate(currentDate.getDate() + 2))
  const twoDayEarlierDate = new Date(currentDate.setDate(currentDate.getDate() + 1))

  return   formatDate(newDate) + " to " + formatDate(twoDayEarlierDate);
}


export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


export const handleNavigate = (product: IProduct, categoryData: Category) => {

    if (product.subcategory) {
      return `/${product.category?.RecallUrl ?? categoryData?.RecallUrl}/${product.subcategory?.custom_url ?? ''}/${product.custom_url?.toLowerCase() ?? ''}`;
    } else {
      return `/${product.category?.RecallUrl ?? categoryData?.RecallUrl}/${product.custom_url?.toLowerCase() ?? ''}`;
    }
  };


export const getShippingData = (type: string, fee: number,selectedEmirate: string) => {
  if (type === 'express') {
    return {
      name: "Express Service (Dubai Only)",
      fee,
      deliveryDuration: "Next working day (cut-off time 1pm)"
    };
  } else if (type === 'standard') {
    if (selectedEmirate === 'Dubai') {
      return {
        name: "Standard Service (Dubai)",
        fee,
        deliveryDuration: "2 working days"
      };
    } else {
      return {
        name: "Standard Service (All Other Emirates)",
        fee,
        deliveryDuration: "2-3 working days",
        freeShipping: 1000
      };
    }
  } else if (type === 'self-collect') {
    return {
      name: "Self-Collect",
      fee,
      deliveryDuration: "Monday to Saturday, 9am – 6pm",
      location: "22nd 15B St - Al Quoz - Al Quoz Industrial Area 4 - Dubai - UAE"
    };
  }
};
