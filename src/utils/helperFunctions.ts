

import axios from 'axios';
import React from 'react';
import { FILE_DELETION_MUTATION } from 'graphql/mutations';
import { IProduct, ProductImage } from 'types/prod';

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
  finalToken?: string
) => {
  try {
    // if(!finalToken) return  toast.success("Token Not found ")
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
  setImagesUrlhandler: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
) => {
  setImagesUrlhandler((prev: ProductImage[] | undefined) => {
    if (!prev) return [];

    const updatedImagesUrl = prev?.map((item: ProductImage, i: number) => i === index ? { ...item, altText: newImageIndex } : item);
    return updatedImagesUrl;
  });
};


export const TrimerHandler = (value: string) => {
  if (!value) return

  return value.trim().toLowerCase()



}


export const ProductsSorting = (filtered: IProduct[], sortOption: string) => {
  switch (sortOption) {
    case "A to Z":
      filtered = filtered?.sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return a.name.localeCompare(b.name);
      });
      break;

    case "Z to A":

      filtered = filtered?.sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return b.name.localeCompare(a.name);
      });
      break;

    case "Low to High":
      filtered = filtered?.sort((a: IProduct, b) => {
        const priceA = a.price
        const priceB = b.price

        return priceA - priceB;
      });
      break;

    case "High to Low":
      filtered = filtered?.sort((a, b) => {
        const priceA = a.price
        const priceB = b.price


        return priceB - priceA;
      });
      break;

    default:
      break;
  }
}
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

  return "Available for self collection within 2-3 days i.e:" + formatDate(newDate) + " to " + formatDate(twoDayEarlierDate);
}


export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
