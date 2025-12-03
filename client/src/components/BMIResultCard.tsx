import { Card } from "@/components/ui/card";
import { Save } from "lucide-react";
import { type BMIResult } from "@/lib/bmi";

interface BMIResultCardProps {
  result: BMIResult;
  unit: "metric" | "imperial";
  onSavePdf: () => void;
}

export default function BMIResultCard({ result, unit, onSavePdf }: BMIResultCardProps) {
  // Helper to convert kg back to lbs for display if needed
  const kgToLbs = (kg: number) => (kg * 2.20462).toFixed(1);
  const displayWeight = (kg: number) => unit === "imperial" ? `${kgToLbs(kg)} lbs` : `${kg.toFixed(1)} kg`;

  // Gauge calculation
  // We want a semi-circle (180 degrees).
  // Range is typically 15 (min) to 40 (max) for the visual chart usually.
  // Let's define standard positions on a 0-100 scale for the gauge arc.
  // 16, 17, 18.5, 25, 30, 35, 40
  
  // Map BMI to angle (0 to 180)
  // Let's say chart goes from BMI 10 to 45 to cover all bases
  const minChart = 12;
  const maxChart = 42;
  const range = maxChart - minChart;
  
  const getAngle = (value: number) => {
    const clamped = Math.min(Math.max(value, minChart), maxChart);
    const percent = (clamped - minChart) / range;
    return percent * 180; // 0 to 180
  };

  const needleAngle = getAngle(result.bmi);

  // Text color based on category for the header
  const getHeaderColor = () => {
    if (result.category === "Healthy Weight") return "bg-[#4CAF50]"; // Green
    if (result.category === "Underweight") return "bg-[#FFC107]"; // Yellow/Amber usually, but image implies multicolored. Let's use standard green for header if good.
    if (result.category === "Overweight") return "bg-[#FFEB3B] text-black"; // Yellow
    return "bg-[#D32F2F]"; // Red
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-neutral-200">
      {/* Header */}
      <div className={`${getHeaderColor()} p-3 flex justify-between items-center text-white`}>
        <h2 className={`text-xl font-bold ${result.category === "Overweight" ? "text-black" : "text-white"}`}>Result</h2>
        <button onClick={onSavePdf} className="flex flex-col items-center text-xs hover:opacity-80 transition-opacity">
          <Save className="h-5 w-5" />
          <span>save</span>
        </button>
      </div>

      <div className="p-6">
        {/* Summary Line */}
        <div className="text-center mb-6">
          <span className="text-xl font-bold">BMI = {result.bmi} kg/m² </span>
          <span className={`text-xl font-bold ml-2 ${
            result.category === "Healthy Weight" ? "text-[#4CAF50]" : 
            result.category === "Overweight" ? "text-[#FBC02D]" : 
            result.category === "Underweight" ? "text-[#FFA000]" : "text-[#D32F2F]"
          }`}>
            ({result.category})
          </span>
        </div>

        {/* Gauge Visualization */}
        <div className="relative h-48 w-full flex justify-center overflow-hidden mb-6">
          <svg viewBox="0 0 300 160" className="w-full max-w-[300px]">
            {/* Arc Segments */}
            {/* Underweight < 18.5 */}
            <path d="M 30 150 A 120 120 0 0 1 88 43" fill="none" stroke="#FFEB3B" strokeWidth="40" /> 
            {/* Normal 18.5 - 25 */}
            <path d="M 88 43 A 120 120 0 0 1 150 30" fill="none" stroke="#4CAF50" strokeWidth="40" />
            <path d="M 150 30 A 120 120 0 0 1 212 43" fill="none" stroke="#4CAF50" strokeWidth="40" />
            {/* Overweight 25 - 30 */}
            <path d="M 212 43 A 120 120 0 0 1 258 90" fill="none" stroke="#FFEB3B" strokeWidth="40" />
            {/* Obese > 30 */}
            <path d="M 258 90 A 120 120 0 0 1 270 150" fill="none" stroke="#D32F2F" strokeWidth="40" />

            {/* Custom colors overlay to match the image style more closely - Gradient-ish look via multiple segments */}
            {/* Actually SVG paths above are simplified. Let's try a cleaner approach with precise angles for 18.5, 25, 30 */}
            
            {/* 
               Angles (approximate for visual):
               Start: 180 deg (Left) -> 0 deg (Right) ? No, SVG coords are different.
               Let's use a standard gauge approach: 180 degree arc from left to right.
               Center (150, 150). Radius 120.
            */}
            <g transform="translate(150, 150) rotate(180)"> 
               {/* This rotates the whole thing so 0 is left. */}
            </g>
            
            {/* Re-drawing with precise segments based on our min/max chart values (12 - 42) */}
            {/* 
               Total Range: 30 units. 
               180 degrees / 30 units = 6 degrees per unit.
               
               12 (start) -> 0 deg
               18.5 -> (18.5 - 12) * 6 = 39 deg
               25 -> (25 - 12) * 6 = 78 deg
               30 -> (30 - 12) * 6 = 108 deg
               35 -> (35 - 12) * 6 = 138 deg
               42 (end) -> 180 deg
            */}
            
            {/* Underweight (12 - 18.5) - Yellow/Red mix */}
            <path d={describeArc(150, 150, 120, -90, -90 + 39)} fill="none" stroke="#FFC107" strokeWidth="35" />
            
            {/* Normal (18.5 - 25) - Green */}
            <path d={describeArc(150, 150, 120, -90 + 39, -90 + 78)} fill="none" stroke="#4CAF50" strokeWidth="35" />
            
            {/* Overweight (25 - 30) - Yellow */}
            <path d={describeArc(150, 150, 120, -90 + 78, -90 + 108)} fill="none" stroke="#FFEB3B" strokeWidth="35" />
            
            {/* Obese I (30 - 35) - Orange/Pinkish */}
            <path d={describeArc(150, 150, 120, -90 + 108, -90 + 138)} fill="none" stroke="#E57373" strokeWidth="35" />
            
            {/* Obese II (35 - 42) - Red */}
            <path d={describeArc(150, 150, 120, -90 + 138, 90)} fill="none" stroke="#D32F2F" strokeWidth="35" />

            {/* Labels inside segments */}
            <text x="60" y="100" fontSize="10" textAnchor="middle" transform="rotate(-20, 60, 100)" fill="#333">Underweight</text>
            <text x="120" y="60" fontSize="10" textAnchor="middle" transform="rotate(0, 120, 60)" fill="#333">Normal</text>
            <text x="190" y="60" fontSize="10" textAnchor="middle" transform="rotate(20, 190, 60)" fill="#333">Overweight</text>
            <text x="250" y="110" fontSize="10" textAnchor="middle" transform="rotate(45, 250, 110)" fill="#333">Obesity</text>

            {/* Ticks */}
            {/* 18.5 */}
            <text x={polarToCartesian(150, 150, 145, -90 + 39).x} y={polarToCartesian(150, 150, 145, -90 + 39).y} fontSize="10" textAnchor="middle" fill="#555">18.5</text>
            {/* 25 */}
            <text x={polarToCartesian(150, 150, 145, -90 + 78).x} y={polarToCartesian(150, 150, 145, -90 + 78).y} fontSize="10" textAnchor="middle" fill="#555">25</text>
            {/* 30 */}
            <text x={polarToCartesian(150, 150, 145, -90 + 108).x} y={polarToCartesian(150, 150, 145, -90 + 108).y} fontSize="10" textAnchor="middle" fill="#555">30</text>
            {/* 35 */}
            <text x={polarToCartesian(150, 150, 145, -90 + 138).x} y={polarToCartesian(150, 150, 145, -90 + 138).y} fontSize="10" textAnchor="middle" fill="#555">35</text>


            {/* Needle */}
            <g transform={`rotate(${needleAngle - 90}, 150, 150)`}>
              <path d="M145 150 L150 35 L155 150 Z" fill="#333" />
              <circle cx="150" cy="150" r="6" fill="#555" />
            </g>

            {/* Central BMI Text */}
            <text x="150" y="135" fontSize="24" fontWeight="bold" textAnchor="middle" fill="black">BMI = {result.bmi}</text>
          </svg>
        </div>

        {/* Detailed Stats List */}
        <div className="space-y-2 text-sm md:text-base text-gray-800">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Healthy BMI range: <strong>18.5 kg/m² - 25 kg/m²</strong>
            </li>
            <li>
              Healthy weight for the height: <strong>{displayWeight(result.healthyWeightRange.min)} - {displayWeight(result.healthyWeightRange.max)}</strong>
            </li>
            <li>
              {result.weightToLoseOrGain === 0 ? (
                 <span>You are at a healthy weight.</span>
              ) : result.weightToLoseOrGain < 0 ? (
                <span>Lose <strong>{displayWeight(Math.abs(result.weightToLoseOrGain))}</strong> to reach a BMI of 25 kg/m².</span>
              ) : (
                <span>Gain <strong>{displayWeight(result.weightToLoseOrGain)}</strong> to reach a BMI of 18.5 kg/m².</span>
              )}
            </li>
            <li>
              BMI Prime: <strong>{result.prime}</strong>
            </li>
            <li>
              Ponderal Index: <strong>{result.ponderalIndex} kg/m³</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// SVG Helper Functions
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  var angleInRadians = (angleInDegrees) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}
