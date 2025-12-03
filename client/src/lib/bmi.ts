
export type BMIResult = {
  bmi: number;
  category: "Underweight" | "Healthy Weight" | "Overweight" | "Obese";
  color: string;
  message: string;
};

export const calculateMetricBMI = (heightCm: number, weightKg: number): number => {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return parseFloat(bmi.toFixed(1));
};

export const calculateImperialBMI = (heightFt: number, heightIn: number, weightSt: number, weightLbs: number): number => {
  const totalInches = (heightFt * 12) + heightIn;
  const totalLbs = (weightSt * 14) + weightLbs;
  if (totalInches <= 0 || totalLbs <= 0) return 0;
  const bmi = 703 * (totalLbs / (totalInches * totalInches));
  return parseFloat(bmi.toFixed(1));
};

export const interpretBMI = (bmi: number): BMIResult => {
  if (bmi < 18.5) {
    return { 
      bmi, 
      category: "Underweight", 
      color: "text-blue-600 border-blue-200 bg-blue-50",
      message: "You may need to gain weight. Consult a GP for advice."
    };
  } else if (bmi < 25) {
    return { 
      bmi, 
      category: "Healthy Weight", 
      color: "text-green-600 border-green-200 bg-green-50",
      message: "You're a healthy weight for your height. Keep up the good work!"
    };
  } else if (bmi < 30) {
    return { 
      bmi, 
      category: "Overweight", 
      color: "text-orange-600 border-orange-200 bg-orange-50",
      message: "You may be slightly overweight. Small changes can help."
    };
  } else {
    return { 
      bmi, 
      category: "Obese", 
      color: "text-red-600 border-red-200 bg-red-50",
      message: "Your health may be at risk. Please consult a healthcare professional."
    };
  }
};