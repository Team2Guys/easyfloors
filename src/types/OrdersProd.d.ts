export interface ORDERS_PROD {
    name: string;
    price: number;
    image: string;
    boxCoverage: string;
    totalPrice: number;
    pricePerBox: number;
    squareMeter: string;
    requiredBoxes: number;
    category?: string;
    selectedColor?: ProductImage;
    __typename: string;
  }
  
  export interface ShippingMethod {
    fee: number;
    name: "Standard Shipping" | "Express Shipping" | "Self Collect";
    deliveryDuration: string;
  }
  
  export interface PostPaymentStatus {
    products: ORDERS_PROD[];
    email: string;
    lastName: string;
    firstName: string;
    totalPrice: number;
    shippingMethod: ShippingMethod;
    transactionDate: string;
    orderId:string;
    address:string
    cardLastDigits:number
    currency:string
    shipmentFee:number
    __typename: string;
    checkoutDate?:string
  }
  
  export interface PostPaymentStatusResponse {
    data: {
      postpaymentStatus: PostPaymentStatus;
    };
    trackingOrer?:boolean
  }
  