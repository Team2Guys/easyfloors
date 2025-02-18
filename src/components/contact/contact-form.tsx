import Input from "components/common/input/Input";
import React from "react";

const ContactForm = () => {
  return (
    <form>
      <div className="grid grid-cols-2 gap-5 mt-4">
        <Input label="First Name" name="firstName" required />
        <Input label="Last Name" name="LastName" required />
        <Input label="Email" type="email" name="email" required />
        <Input label="Phone Number" type="number" name="phoneNumber" required />
        <div className="col-span-2">
        <label htmlFor="Message" className="text-14 md:text-20 font-medium font-inter">Message</label>
          <textarea
            className="w-full h-40 sm:h-60 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-5"
            name="message"
            required
            maxLength={500}
          >
          </textarea>
        </div>
      </div>
      <div className="w-full text-end mt-5">
  <button
    type="submit"
    className="w-[200px] sm:w-[300px] h-[50px] sm:h-[83px] border border-primary text-black hover:text-white font-medium font-inter hover:bg-primary hover:bg-primary-dark duration-300 ease-in-out text-16 sm:text-20"
  >
    Send Message
  </button>
      </div>
    </form>
  );
};

export default ContactForm;
