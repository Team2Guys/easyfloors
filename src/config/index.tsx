import { selectTotalPrice, totalProductsInCart } from 'redux/slices/cart';
import { State } from 'redux/store';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IProduct, IReview } from 'types/type';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { CartItem } from 'redux/slices/cart/types';

export const SubTotal = () => {
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );

  return <>{totalPrice.toLocaleString()}</>;
};

export const TotalProducts = () => {
  const totalPrice = useSelector((state: State) =>
    totalProductsInCart(state.cart),
  );
  return {totalPrice};
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const calculateRatingsPercentage = (reviews: IReview[]) => {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return {
      productReviews: [],
      averageRating: 0,
    };
  }

  const ratingCounts: { [key: number]: number } = {
    5: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 5).length
      : 0,
    4: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 4).length
      : 0,
    3: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 3).length
      : 0,
    2: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 2).length
      : 0,
    1: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 1).length
      : 0,
  };

  const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
  const averageRating = (totalStars / totalReviews).toFixed(1);

  const productReviews = Object.keys(ratingCounts)
    .reverse()
    .map((star) => ({
      label: `${star} star`,
      ratingValue: Math.round((ratingCounts[Number(star)] / totalReviews) * 100),
    }));

  return {
    productReviews,
    averageRating: parseFloat(averageRating),
  };
};
 
export const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};
 
export const renderStars = ({ star = 0 }: { star?: number }) => {
  const stars = [];
  const maxStars = 5;
  for (let i = 1; i <= maxStars; i++) {
    if (i <= star) {
      stars.push(<MdStar key={i} size={20} className="text-warning" />);
    } else {
      stars.push(<MdStarBorder key={i} size={20} className="text-warning" />);
    }
  }
  return stars;
};


export const variationProducts = ({ products }: { products: IProduct[] }) => {
  return products?.flatMap((prod) => {
    if ((!prod.sizes || prod.sizes.length === 0) && (!prod.filter || prod.filter.length === 0)) {
      return [prod];
    }

    if (!prod.productImages || prod.productImages.length === 0) {
      return [];
    }

    const uniqueVariations = new Map();

    prod.productImages
      .filter((img) => img.index)
      .forEach((img) => {
        const sizeMatch = prod.sizes?.find(
          (size) => size.name?.toLowerCase() === img.size?.toLowerCase()
        );
        const filterMatch = prod.filter?.[0]?.additionalInformation?.find(
          (filterItem) => filterItem.name?.toLowerCase() === img.color?.toLowerCase()
        );

        const hoverImageMatch = prod.productImages.find(
          (hoverImg) => hoverImg.index === img.index && hoverImg.imageUrl !== img.imageUrl
        );

        const variationKey = img.index;

        if (!uniqueVariations.has(variationKey)) {
          uniqueVariations.set(variationKey, {
            ...prod,
            name: prod.name,
            displayName: `${prod.name} - ${img.size?.toLowerCase() === img.color?.toLowerCase()
              ? img.size
              : `${img.size ? img.size : ''} ${img.color ? `(${img.color})` : ''}`
              }`,
            sizeName: img.size,
            colorName: img.color,
            price: sizeMatch
              ? Number(sizeMatch.price)
              : filterMatch
                ? Number(filterMatch.price)
                : Number(prod.price),
            discountPrice: sizeMatch
              ? Number(sizeMatch.discountPrice)
              : filterMatch
                ? Number(filterMatch.discountPrice || 0)
                : Number(prod.discountPrice),
            posterImageUrl: img.imageUrl,
            hoverImageUrl: hoverImageMatch ? hoverImageMatch.imageUrl : prod.hoverImageUrl,
            stock: sizeMatch?.stock ?? prod.stock,
          });
        }
      });

    return Array.from(uniqueVariations.values());
  })
};

export const variationName = ({ product }: { product: IProduct }) => {
  if (product.sizeName && product.colorName && product.sizeName.includes(product.colorName)) {
    return product.displayName = `${product.name} -  ${product.sizeName}`;
  }
  else if (product.colorName && !product.sizeName) {
    return product.displayName = `${product.name} -  (${product.colorName})`;
  } else {
    return product.displayName;
  }
}

export const getProductStock = ({ product }: { product: CartItem }) => {
  if (!product.selectedSize && product.selectedfilter) {
    console.log(product, "productHeader")
  }

  if (product.selectedSize && product.selectedfilter) {
    const findSize = product.sizes?.find(
      (prod) => (prod.name === product.selectedSize?.name) && (prod.filterName ? prod.filterName === product.selectedfilter?.name : true)
    );
    return Number(findSize?.stock);
  } else if (!product.selectedSize && product.selectedfilter) {
    const findFilter = product.filter?.[0]?.additionalInformation?.find(
      (prod) => prod.name === product.selectedfilter?.name
    );
    return Number(findFilter?.stock);
  } else {
    return Number(product.stock);
  }
};



export const getAllStock = (product : CartItem  ) => {
  console.log(product, "getAllStock")
  if (!product) return '';
  let totalStock: number = 0;

  if (product.sizes && product.sizes.length > 0) {
    //eslint-disable-next-line 
    const sizesStock = product.sizes.find((value:any) => value.name?.trim() === product.sizeName?.trim()); 
    if (sizesStock) {
      totalStock = Number(sizesStock.stock);

    }

  } else if (product.filter && product.filter.length > 0) {
    //eslint-disable-next-line
    const filterStock = product.filter[0].additionalInformation.find((value:any) => value.name?.trim() === product.colorName?.trim());
    if (filterStock) {
      totalStock = Number(filterStock.stock);
    }
  } else {
    totalStock = Number(product.stock);
  }

console.log(totalStock, "getAllStock")


  return totalStock;
};
