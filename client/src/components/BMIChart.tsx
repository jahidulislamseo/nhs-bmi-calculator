import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type BmiRecord } from "@shared/schema";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface BMIChartProps {
    data: BmiRecord[];
}

export function BMIChart({ data }: BMIChartProps) {
    if (!data.length) {
        return null;
    }

    // Reverse data to show oldest to newest on graph
    const chartData = [...data].reverse();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
        >
            <Card>
                <CardHeader>
                    <CardTitle>Your BMI History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis
                                    dataKey="createdAt"
                                    tickFormatter={(value) => format(new Date(value), "MMM d, HH:mm")}
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={[10, 40]}
                                />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Date
                                                            </span>
                                                            <span className="font-bold text-muted-foreground">
                                                                {format(new Date(label), "MMM d, yyyy")}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                BMI
                                                            </span>
                                                            <span className="font-bold text-primary">
                                                                {payload[0].value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <ReferenceLine y={18.5} label="Underweight" stroke="orange" strokeDasharray="3 3" />
                                <ReferenceLine y={25} label="Overweight" stroke="orange" strokeDasharray="3 3" />
                                <ReferenceLine y={30} label="Obese" stroke="red" strokeDasharray="3 3" />
                                <Line
                                    type="monotone"
                                    dataKey="bmi"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    activeDot={{ r: 8 }}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
