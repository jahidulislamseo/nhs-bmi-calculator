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

  // Gauge configuration
  const radius = 100;
  const strokeWidth = 35;
  const centerX = 150;
  const centerY = 140; // Moved up slightly to fit text below

  // Scale configuration: 15 to 40 to match the image better (starts near 16)
  const minChart = 15;
  const maxChart = 40;
  const totalRange = maxChart - minChart;
  const startAngle = 180;

  const valueToAngle = (value: number) => {
    const clamped = Math.min(Math.max(value, minChart), maxChart);
    const percent = (clamped - minChart) / totalRange;
    return startAngle + (percent * 180);
  };

  const needleAngle = valueToAngle(result.bmi);

  // Text color based on category for the top summary
  const getCategoryColor = () => {
    if (result.category === "Healthy Weight") return "text-[#4CAF50]"; // Green
    if (result.category === "Underweight") return "text-[#D32F2F]"; // Red
    if (result.category === "Overweight") return "text-[#FDD835]"; // Yellow
    return "text-[#D32F2F]"; // Red for Obese
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-neutral-200 font-sans">
      {/* Header - Static Green matching the image */}
      <div className="bg-[#558B2F] p-3 flex justify-between items-center text-white">
        <h2 className="text-xl font-bold text-white">Result</h2>
        <button onClick={onSavePdf} className="flex flex-col items-center text-xs hover:opacity-80 transition-opacity text-white">
          <Save className="h-5 w-5" />
          <span>save</span>
        </button>
      </div>

      <div className="p-6">
        {/* Summary Text */}
        <div className="text-center mb-2">
          <h3 className="text-2xl font-bold text-black">
            BMI = {result.bmi} kg/m² <span className={getCategoryColor()}>({result.category})</span>
          </h3>
        </div>

        {/* Gauge Visualization */}
        <div className="relative h-48 w-full flex justify-center overflow-hidden mb-4">
          <svg viewBox="0 0 300 160" className="w-full max-w-[320px]">
            
            {/* Segments */}
            {/* Underweight: minChart to 18.5 - Red */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(minChart), valueToAngle(18.5))} 
              fill="none" 
              stroke="#D32F2F" 
              strokeWidth={strokeWidth} 
            />

            {/* Normal: 18.5 to 25 - Green */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(18.5), valueToAngle(25))} 
              fill="none" 
              stroke="#4CAF50" 
              strokeWidth={strokeWidth} 
            />

            {/* Overweight: 25 to 30 - Yellow */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(25), valueToAngle(30))} 
              fill="none" 
              stroke="#FDD835" 
              strokeWidth={strokeWidth} 
            />

            {/* Obesity: 30 to maxChart - Red */}
            <path 
              d={describeArc(centerX, centerY, radius, valueToAngle(30), valueToAngle(maxChart))} 
              fill="none" 
              stroke="#C62828" 
              strokeWidth={strokeWidth} 
            />

            {/* White dividers between segments */}
            <path d={describeArc(centerX, centerY, radius, valueToAngle(18.5)-0.5, valueToAngle(18.5)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />
            <path d={describeArc(centerX, centerY, radius, valueToAngle(25)-0.5, valueToAngle(25)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />
            <path d={describeArc(centerX, centerY, radius, valueToAngle(30)-0.5, valueToAngle(30)+0.5)} fill="none" stroke="white" strokeWidth={strokeWidth+2} />

            {/* Labels outside the arc - using textPath to follow the curve */}
            {/* Hidden paths for text alignment */}
            <defs>
              <path id="arc-underweight" d={describeArc(centerX, centerY, radius + 12, valueToAngle(minChart), valueToAngle(18.5))} />
              <path id="arc-normal" d={describeArc(centerX, centerY, radius + 12, valueToAngle(18.5), valueToAngle(25))} />
              <path id="arc-overweight" d={describeArc(centerX, centerY, radius + 12, valueToAngle(25), valueToAngle(30))} />
              <path id="arc-obesity" d={describeArc(centerX, centerY, radius + 12, valueToAngle(30), valueToAngle(maxChart))} />
            </defs>

            <text fontSize="10" fill="#000">
              <textPath href="#arc-underweight" startOffset="50%" textAnchor="middle">
                Underweight
              </textPath>
            </text>
            
            <text fontSize="10" fill="#000">
              <textPath href="#arc-normal" startOffset="50%" textAnchor="middle">
                Normal
              </textPath>
            </text>
            
            <text fontSize="10" fill="#000">
              <textPath href="#arc-overweight" startOffset="50%" textAnchor="middle">
                Overweight
              </textPath>
            </text>
            
            <text fontSize="10" fill="#000">
              <textPath href="#arc-obesity" startOffset="50%" textAnchor="middle">
                Obesity
              </textPath>
            </text>

            {/* Tick Values - Inside the band, White */}
            {[16, 17, 18.5, 25, 30, 35, 40].map(val => (
               val >= minChart && val <= maxChart && (
                <text 
                  key={val}
                  x={polarToCartesian(centerX, centerY, radius - 15, valueToAngle(val)).x} 
                  y={polarToCartesian(centerX, centerY, radius - 15, valueToAngle(val)).y + 4} 
                  fontSize="9" 
                  fontWeight="bold" 
                  textAnchor="middle" 
                  fill="white"
                >
                  {val}
                </text>
               )
            ))}

            {/* Big BMI Text in Center */}
            <text x={centerX} y={centerY - 20} fontSize="28" fontWeight="bold" textAnchor="middle" fill="#000">
              BMI = {result.bmi}
            </text>

            {/* Needle */}
            <g transform={`translate(${centerX}, ${centerY}) rotate(${needleAngle - 90})`}>
               <line x1="0" y1="0" x2="0" y2="-85" stroke="#333" strokeWidth="2" />
               <polygon points="0,-95 -6,-85 6,-85" fill="#000" />
               <circle cx="0" cy="0" r="6" fill="#555" />
            </g>
          </svg>
        </div>

        {/* Stats List */}
        <div className="space-y-2 text-base text-gray-900 leading-relaxed">
          <ul className="list-disc pl-5 space-y-1 marker:text-black">
            <li>
              Healthy BMI range: 18.5 kg/m² - 25 kg/m²
            </li>
            <li>
              Healthy weight for the height: {displayWeight(result.healthyWeightRange.min)} - {displayWeight(result.healthyWeightRange.max)}
            </li>
            <li>
              {result.weightToLoseOrGain === 0 ? (
                 <span>You are at a healthy weight.</span>
              ) : result.weightToLoseOrGain < 0 ? (
                <span>Lose {displayWeight(Math.abs(result.weightToLoseOrGain))} to reach a BMI of 25 kg/m².</span>
              ) : (
                <span>Gain {displayWeight(result.weightToLoseOrGain)} to reach a BMI of 18.5 kg/m².</span>
              )}
            </li>
            <li>
              BMI Prime: {result.prime}
            </li>
            <li>
              Ponderal Index: {result.ponderalIndex} kg/m³
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