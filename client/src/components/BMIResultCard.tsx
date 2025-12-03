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

  // Gauge Constants
  const radius = 120;
  const strokeWidth = 30;
  const centerX = 150;
  const centerY = 150;
  
  // Chart Ranges (BMI values)
  const minChart = 12;
  const maxChart = 42;
  const totalRange = maxChart - minChart;
  
  // Angle Mapping (180 degrees total, from 180 to 360 in SVG coords)
  // 180 deg = Left, 270 deg = Top, 360/0 deg = Right
  const startAngle = 180;
  const endAngle = 360;
  
  const valueToAngle = (value: number) => {
    const clamped = Math.min(Math.max(value, minChart), maxChart);
    const percent = (clamped - minChart) / totalRange;
    return startAngle + (percent * 180);
  };

  const needleAngle = valueToAngle(result.bmi);

  // Text color based on category for the header
  const getHeaderColor = () => {
    if (result.category === "Healthy Weight") return "bg-[#4CAF50]"; // Green
    if (result.category === "Underweight") return "bg-[#FBC02D]"; // Yellow-Orange
    if (result.category === "Overweight") return "bg-[#FFEB3B] text-black"; // Yellow
    return "bg-[#D32F2F]"; // Red
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-neutral-200">
      {/* Header */}
      <div className={`${getHeaderColor()} p-3 flex justify-between items-center text-white transition-colors duration-300`}>
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
            result.category === "Overweight" ? "text-[#F9A825]" : 
            result.category === "Underweight" ? "text-[#F57F17]" : "text-[#D32F2F]"
          }`}>
            ({result.category})
          </span>
        </div>

        {/* Gauge Visualization */}
        <div className="relative h-48 w-full flex justify-center overflow-hidden mb-6">
          <svg viewBox="0 0 300 160" className="w-full max-w-[300px]">
             {/* Definitions for gradients if we wanted them, but flat colors are requested */}
            
            {/* Segments 
                Underweight: 12 - 18.5
                Normal: 18.5 - 25
                Overweight: 25 - 30
                Obese: 30 - 42
            */}
            
            {/* Underweight (Yellow/Orange) */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(12), valueToAngle(18.5))} 
              fill="none" 
              stroke="#FFEB3B" 
              strokeWidth={strokeWidth} 
            />
            
            {/* Normal (Green) */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(18.5), valueToAngle(25))} 
              fill="none" 
              stroke="#4CAF50" 
              strokeWidth={strokeWidth} 
            />
            
            {/* Overweight (Amber/Orange) */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(25), valueToAngle(30))} 
              fill="none" 
              stroke="#FFC107" 
              strokeWidth={strokeWidth} 
            />
            
            {/* Obese (Red) */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(30), valueToAngle(42))} 
              fill="none" 
              stroke="#D32F2F" 
              strokeWidth={strokeWidth} 
            />

            {/* Divider Lines (White) to separate zones clearly */}
            <path d={describeArc(centerX, centerY, radius, valueToAngle(18.5)-0.5, valueToAngle(18.5)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />
            <path d={describeArc(centerX, centerY, radius, valueToAngle(25)-0.5, valueToAngle(25)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />
            <path d={describeArc(centerX, centerY, radius, valueToAngle(30)-0.5, valueToAngle(30)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />

            {/* Text Labels */}
            {/* Positioned using polar coordinates at a slightly smaller radius */}
            <text x={polarToCartesian(centerX, centerY, 90, valueToAngle(15.25)).x} y={polarToCartesian(centerX, centerY, 90, valueToAngle(15.25)).y} fontSize="9" textAnchor="middle" transform={`rotate(-60, ${polarToCartesian(centerX, centerY, 90, valueToAngle(15.25)).x}, ${polarToCartesian(centerX, centerY, 90, valueToAngle(15.25)).y})`} fill="#555">Underweight</text>
            <text x={polarToCartesian(centerX, centerY, 90, valueToAngle(21.75)).x} y={polarToCartesian(centerX, centerY, 90, valueToAngle(21.75)).y} fontSize="9" textAnchor="middle" transform={`rotate(-20, ${polarToCartesian(centerX, centerY, 90, valueToAngle(21.75)).x}, ${polarToCartesian(centerX, centerY, 90, valueToAngle(21.75)).y})`} fill="#555">Normal</text>
            <text x={polarToCartesian(centerX, centerY, 90, valueToAngle(27.5)).x} y={polarToCartesian(centerX, centerY, 90, valueToAngle(27.5)).y} fontSize="9" textAnchor="middle" transform={`rotate(20, ${polarToCartesian(centerX, centerY, 90, valueToAngle(27.5)).x}, ${polarToCartesian(centerX, centerY, 90, valueToAngle(27.5)).y})`} fill="#555">Overweight</text>
            <text x={polarToCartesian(centerX, centerY, 90, valueToAngle(36)).x} y={polarToCartesian(centerX, centerY, 90, valueToAngle(36)).y} fontSize="9" textAnchor="middle" transform={`rotate(50, ${polarToCartesian(centerX, centerY, 90, valueToAngle(36)).x}, ${polarToCartesian(centerX, centerY, 90, valueToAngle(36)).y})`} fill="#555">Obesity</text>


            {/* Numeric Ticks (Outer) */}
            {/* 18.5 */}
            <text x={polarToCartesian(centerX, centerY, 145, valueToAngle(18.5)).x} y={polarToCartesian(centerX, centerY, 145, valueToAngle(18.5)).y} fontSize="10" textAnchor="middle" fill="#777">18.5</text>
            {/* 25 */}
            <text x={polarToCartesian(centerX, centerY, 145, valueToAngle(25)).x} y={polarToCartesian(centerX, centerY, 145, valueToAngle(25)).y} fontSize="10" textAnchor="middle" fill="#777">25</text>
            {/* 30 */}
            <text x={polarToCartesian(centerX, centerY, 145, valueToAngle(30)).x} y={polarToCartesian(centerX, centerY, 145, valueToAngle(30)).y} fontSize="10" textAnchor="middle" fill="#777">30</text>


            {/* Needle */}
            {/* Rotate around center. -90 offset because standard 0 is right, we want 0 to be top? No, SVG rotate is clockwise.
                At 180 deg (Start), we want needle pointing left.
                Standard needle points Up (if drawn M145 150...).
                So at 180, we need it rotated -90?
                Let's just use the calculated angle directly and adjust the drawing.
                If we draw needle pointing RIGHT (0 deg), then we just use the angle.
            */}
            <g transform={`rotate(${needleAngle}, ${centerX}, ${centerY})`}>
               {/* Draw needle pointing to 0 (Right) initially? No, let's stick to standard rotation. */}
               {/* If needle points Left at 0 rotation, then at 180 it points Right.
                   Let's draw needle pointing LEFT initially (180 deg position in SVG).
                   Then we rotate by (angle - 180).
                   Actually simpler: Draw needle pointing RIGHT (0 deg).
                   Then rotate by `needleAngle`. 
                   Since needleAngle goes 180 -> 360.
                   180 = Left. 270 = Up. 360 = Right.
               */}
              <path d={`M ${centerX-5} ${centerY} L ${centerX} ${centerY-radius+10} L ${centerX+5} ${centerY} Z`} fill="#333" transform={`rotate(90, ${centerX}, ${centerY})`} /> 
              {/* Wait, simple math:
                  Draw needle pointing UP (270 deg).
                  Then rotate by (needleAngle - 270).
              */}
            </g>
            
            {/* Let's try a simpler needle group */}
            <g transform={`translate(${centerX}, ${centerY}) rotate(${needleAngle})`}>
               {/* 
                   At angle 0 (Right), we want it pointing Right.
                   At angle 270 (Top), we want it pointing Top.
                   So we draw a needle pointing to 0 (Right).
               */}
               <path d="M 0 -5 L 110 0 L 0 5 Z" fill="#333" />
               <circle cx="0" cy="0" r="8" fill="#555" />
            </g>


            {/* Central BMI Text */}
            <text x={centerX} y={centerY - 20} fontSize="28" fontWeight="bold" textAnchor="middle" fill="black">BMI = {result.bmi}</text>
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