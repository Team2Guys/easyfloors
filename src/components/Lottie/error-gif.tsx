"use client";
import React from "react";
import { useLottie } from "lottie-react";

const style = {
  height: 250,
};

interface LottieCustomProps {
  data: object; 
}

const LottieCustom: React.FC<LottieCustomProps> = ({ data }) => {
  const options = {
    animationData: data,
    loop: true,
  };

  const { View } = useLottie(options, style);

  return View; 
};

export default LottieCustom;
