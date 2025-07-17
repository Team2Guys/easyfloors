
import Shipping from "./Shipping";

const FreeSampleThank = ({orderId}:{orderId?:string}) => {


   return (
      <div className="max-w-4xl mx-auto md:p-0 p-2 my-10">
         <h1 className="md:text-6xl text-3xl font-bold text-center font-inter">THANK YOU!</h1>
         <p className="text-center mt-2 md:text-xl text-base md:px-0 px-4">An order confirmation email has been sent to your inbox with all the details.</p>
         <p className="text-center mt-2 md:text-xl text-base md:px-0 px-4">We’ll process your sample shortly, and you’ll receive a notification once it’s on the way. If you have any questions, feel free to reach out to our support team.</p>
 
         <Shipping orderid ={orderId}/>
      </div>)
};

export default FreeSampleThank;
