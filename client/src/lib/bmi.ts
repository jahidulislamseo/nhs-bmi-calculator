
export type BMIResult = {
  bmi: number;
  category: "Underweight" | "Healthy Weight" | "Overweight" | "Obese";
  color: string;
  message: string;
  // New fields for extended stats
  prime: number;
  ponderalIndex: number; // kg/m^3
  healthyWeightRange: { min: number; max: number }; // in kg
  weightToLoseOrGain: number; // negative for lose, positive for gain, 0 if healthy
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

export const calculateExtendedStats = (bmi: number, heightM: number, weightKg: number) => {
  // Healthy BMI range is 18.5 to 25
  const minHealthyWeight = 18.5 * (heightM * heightM);
  const maxHealthyWeight = 25 * (heightM * heightM);
  
  let weightToLoseOrGain = 0;
  if (bmi < 18.5) {
    // Needs to gain to reach 18.5
    weightToLoseOrGain = minHealthyWeight - weightKg;
  } else if (bmi > 25) {
    // Needs to lose to reach 25
    weightToLoseOrGain = maxHealthyWeight - weightKg; // This will be negative
  }

  // BMI Prime = BMI / 25
  const prime = parseFloat((bmi / 25).toFixed(2));

  // Ponderal Index = weight (kg) / height^3 (m)
  const ponderalIndex = parseFloat((weightKg / Math.pow(heightM, 3)).toFixed(1));

  return {
    prime,
    ponderalIndex,
    healthyWeightRange: { 
      min: parseFloat(minHealthyWeight.toFixed(1)), 
      max: parseFloat(maxHealthyWeight.toFixed(1)) 
    },
    weightToLoseOrGain: parseFloat(weightToLoseOrGain.toFixed(1))
  };
};

export const interpretBMI = (bmi: number, heightM?: number, weightKg?: number): BMIResult => {
  let basicResult: Pick<BMIResult, "bmi" | "category" | "color" | "message">;

  if (bmi < 18.5) {
    basicResult = { 
      bmi, 
      category: "Underweight", 
      color: "text-blue-600", // Will be overridden by gauge colors visually
      message: "You may need to gain weight. Consult a GP for advice."
    };
  } else if (bmi < 25) {
    basicResult = { 
      bmi, 
      category: "Healthy Weight", 
      color: "text-green-600",
      message: "You're a healthy weight for your height. Keep up the good work!"
    };
  } else if (bmi < 30) {
    basicResult = { 
      bmi, 
      category: "Overweight", 
      color: "text-yellow-600",
      message: "You may be slightly overweight. Small changes can help."
    };
  } else {
    basicResult = { 
      bmi, 
      category: "Obese", 
      color: "text-red-600",
      message: "Your health may be at risk. Please consult a healthcare professional."
    };
  }

  // If we have height/weight, calculate extended stats, otherwise return defaults
  if (heightM && weightKg) {
    const stats = calculateExtendedStats(bmi, heightM, weightKg);
    return { ...basicResult, ...stats };
  }

  return {
    ...basicResult,
    prime: 0,
    ponderalIndex: 0,
    healthyWeightRange: { min: 0, max: 0 },
    weightToLoseOrGain: 0
  };
};
