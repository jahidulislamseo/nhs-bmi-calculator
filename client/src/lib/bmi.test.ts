import { calculateMetricBMI, calculateImperialBMI, interpretBMI } from "./bmi";

describe("BMI Calculator Logic", () => {
  test("calculates metric BMI correctly", () => {
    // 180cm, 75kg -> 23.1
    expect(calculateMetricBMI(180, 75)).toBe(23.1);
    // 160cm, 50kg -> 19.5
    expect(calculateMetricBMI(160, 50)).toBe(19.5);
  });

  test("calculates imperial BMI correctly", () => {
    // 5ft 9in (69in), 160lbs -> 23.6
    expect(calculateImperialBMI(5, 9, 0, 160)).toBe(23.6);
    // 6ft 0in (72in), 200lbs -> 27.1
    expect(calculateImperialBMI(6, 0, 0, 200)).toBe(27.1);
  });

  test("interprets BMI categories correctly", () => {
    expect(interpretBMI(18.0).category).toBe("Underweight");
    expect(interpretBMI(22.0).category).toBe("Healthy Weight");
    expect(interpretBMI(27.0).category).toBe("Overweight");
    expect(interpretBMI(35.0).category).toBe("Obese");
  });
});