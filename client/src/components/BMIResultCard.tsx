import { Save } from "lucide-react";
import { type BMIResult } from "@/lib/bmi";

interface BMIResultCardProps {
  result: BMIResult;
  unit: "metric" | "imperial";
  onSavePdf: () => void;
}

export default function BMIResultCard({ result, unit, onSavePdf }: BMIResultCardProps) {
  const kgToLbs = (kg: number) => (kg * 2.20462).toFixed(1);
  const displayWeight = (kg: number) => unit === "imperial" ? `${kgToLbs(kg)} lbs` : `${kg.toFixed(1)} kg`;

  const radius = 100;
  const strokeWidth = 35;
  const centerX = 150;
  const centerY = 150;

  const minChart = 0;
  const maxChart = 40;
  const totalRange = maxChart - minChart;

  const startAngle = 180;

  const valueToAngle = (value: number) => {
    const clamped = Math.min(Math.max(value, minChart), maxChart);
    const percent = (clamped - minChart) / totalRange;
    return startAngle + (percent * 180);
  };

  const needleAngle = valueToAngle(result.bmi);

  const getHeaderColor = () => {
    if (result.category === "Healthy Weight") return "bg-[#4CAF50]";
    if (result.category === "Underweight") return "bg-[#65B741]";
    if (result.category === "Overweight") return "bg-[#FDD835]";
    return "bg-[#E57373]";
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-neutral-200">
      <div className={`${getHeaderColor()} p-3 flex justify-between items-center text-white transition-colors duration-300`}>
        <h2 className={`text-xl font-bold ${result.category === "Overweight" ? "text-black" : "text-white"}`}>Result</h2>
        <button onClick={onSavePdf} className={`flex flex-col items-center text-xs hover:opacity-80 transition-opacity ${result.category === "Overweight" ? "text-black" : "text-white"}`}>
          <Save className="h-5 w-5" />
          <span>save</span>
        </button>
      </div>

      <div className="p-6">
        <div className="relative h-56 w-full flex justify-center overflow-hidden mb-6">
          <svg viewBox="0 0 300 180" className="w-full max-w-[300px]">
            {/* Underweight - Light Green */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(0), valueToAngle(18.5))} 
              fill="none" 
              stroke="#65B741" 
              strokeWidth={strokeWidth} 
            />

            {/* Normal/Healthy - Dark Green */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(18.5), valueToAngle(25))} 
              fill="none" 
              stroke="#4CAF50" 
              strokeWidth={strokeWidth} 
            />

            {/* Overweight - Yellow */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(25), valueToAngle(30))} 
              fill="none" 
              stroke="#FDD835" 
              strokeWidth={strokeWidth} 
            />

            {/* Obesity - Red/Pink */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(30), valueToAngle(40))} 
              fill="none" 
              stroke="#E57373" 
              strokeWidth={strokeWidth} 
            />

            {/* White dividers */}
            <path d={describeArc(centerX, centerY, radius, valueToAngle(18.5)-0.5, valueToAngle(18.5)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />
            <path d={describeArc(centerX, centerY, radius, valueToAngle(25)-0.5, valueToAngle(25)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />
            <path d={describeArc(centerX, centerY, radius, valueToAngle(30)-0.5, valueToAngle(30)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />

            {/* Category labels */}
            <text 
              x={polarToCartesian(centerX, centerY, radius - 48, valueToAngle(9)).x} 
              y={polarToCartesian(centerX, centerY, radius - 48, valueToAngle(9)).y + 4} 
              fontSize="9" 
              fontWeight="600"
              textAnchor="middle" 
              fill="#000"
            >
              Underweight
            </text>

            <text 
              x={polarToCartesian(centerX, centerY, radius - 48, valueToAngle(21.75)).x} 
              y={polarToCartesian(centerX, centerY, radius - 48, valueToAngle(21.75)).y + 4} 
              fontSize="9" 
              fontWeight="600"
              textAnchor="middle" 
              fill="#000"
            >
              Normal
            </text>

            <text 
              x={polarToCartesian(centerX, centerY, radius - 48, valueToAngle(27.5)).x} 
              y={polarToCartesian(centerX, centerY, radius - 48, valueToAngle(27.5)).y + 4} 
              fontSize="9" 
              fontWeight="600"
              textAnchor="middle" 
              fill="#000"
            >
              Overweight
            </text>

            <text 
              x={polarToCartesian(centerX, centerY, radius - 48, valueToAngle(35)).x} 
              y={polarToCartesian(centerX, centerY, radius - 48, valueToAngle(35)).y + 4} 
              fontSize="9" 
              fontWeight="600"
              textAnchor="middle" 
              fill="#000"
            >
              Obesity
            </text>

            {/* BMI markers */}
            <text x={polarToCartesian(centerX, centerY, radius + 22, valueToAngle(18.5)).x} y={polarToCartesian(centerX, centerY, radius + 22, valueToAngle(18.5)).y + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">18.5</text>
            <text x={polarToCartesian(centerX, centerY, radius + 22, valueToAngle(25)).x} y={polarToCartesian(centerX, centerY, radius + 22, valueToAngle(25)).y + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">25</text>
            <text x={polarToCartesian(centerX, centerY, radius + 22, valueToAngle(30)).x} y={polarToCartesian(centerX, centerY, radius + 22, valueToAngle(30)).y + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">30</text>
            <text x={polarToCartesian(centerX, centerY, radius + 22, valueToAngle(40)).x} y={polarToCartesian(centerX, centerY, radius + 22, valueToAngle(40)).y + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">40</text>

            {/* Central BMI Text */}
            <text x={centerX} y={centerY + 18} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#000">
              BMI = {result.bmi}
            </text>

            {/* Needle - pointing precisely at BMI value */}
            <g transform={`translate(${centerX}, ${centerY}) rotate(${needleAngle - 90})`}>
               <polygon points="0,-68 -5,0 5,0" fill="#333" />
               <circle cx="0" cy="0" r="5" fill="#888" />
            </g>
          </svg>
        </div>

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