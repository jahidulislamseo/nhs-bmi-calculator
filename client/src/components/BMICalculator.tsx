import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Share2, Download, RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { calculateMetricBMI, calculateImperialBMI, interpretBMI, type BMIResult } from "@/lib/bmi";

// Helper for number coercion that handles empty strings safely
const numberOrEmpty = z.union([
  z.number(),
  z.string().transform((val) => val === "" ? undefined : Number(val)),
  z.undefined()
]);

// Form Schemas
const metricSchema = z.object({
  heightCm: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Height is required" })
      .min(50, "Height must be at least 50cm")
      .max(300, "Height must be realistic")
  ),
  weightKg: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Weight is required" })
      .min(2, "Weight must be at least 2kg")
      .max(600, "Weight must be realistic")
  ),
  age: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  sex: z.enum(["male", "female"]).optional(),
});

const imperialSchema = z.object({
  heightFt: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Height (ft) is required" })
      .min(1, "Height must be at least 1ft")
      .max(9, "Height must be realistic")
  ),
  heightIn: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)), // Default inches to 0 if empty
    z.number().min(0).max(11, "Inches must be 0-11")
  ),
  weightSt: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)), // Default stones to 0 if empty
    z.number().min(0).optional()
  ),
  weightLbs: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)), // Default lbs to 0 if empty
    z.number().min(0)
  ),
  age: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  sex: z.enum(["male", "female"]).optional(),
}).refine(data => {
  const totalLbs = (data.weightSt || 0) * 14 + data.weightLbs;
  return totalLbs > 5;
}, { message: "Total weight must be realistic (at least 5lbs)", path: ["weightLbs"] });

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [result, setResult] = useState<BMIResult | null>(null);

  const metricForm = useForm<z.infer<typeof metricSchema>>({
    resolver: zodResolver(metricSchema),
    // Use empty strings for initial values to keep inputs controlled
    defaultValues: { 
      heightCm: "" as any, 
      weightKg: "" as any, 
      age: "" as any, 
      sex: undefined 
    },
  });

  const imperialForm = useForm<z.infer<typeof imperialSchema>>({
    resolver: zodResolver(imperialSchema),
    // Use empty strings for initial values to keep inputs controlled
    defaultValues: { 
      heightFt: "" as any, 
      heightIn: "" as any, 
      weightSt: "" as any, 
      weightLbs: "" as any, 
      age: "" as any, 
      sex: undefined 
    },
  });

  const calculateMetric = (data: z.infer<typeof metricSchema>) => {
    const bmi = calculateMetricBMI(data.heightCm, data.weightKg);
    setResult(interpretBMI(bmi));
  };

  const calculateImperial = (data: z.infer<typeof imperialSchema>) => {
    const bmi = calculateImperialBMI(data.heightFt, data.heightIn, data.weightSt || 0, data.weightLbs);
    setResult(interpretBMI(bmi));
  };

  const copyToClipboard = () => {
    if (result) {
      const text = `My BMI is ${result.bmi} (${result.category}). Calculated with nhs bmi calculator.`;
      navigator.clipboard.writeText(text);
      alert("Result copied to clipboard!");
    }
  };

  const saveAsPDF = () => {
    alert("This would trigger a PDF download in a production environment.");
  };

  const reset = () => {
    setResult(null);
    metricForm.reset({ 
      heightCm: "" as any, 
      weightKg: "" as any, 
      age: "" as any, 
      sex: undefined 
    });
    imperialForm.reset({ 
      heightFt: "" as any, 
      heightIn: "" as any, 
      weightSt: "" as any, 
      weightLbs: "" as any, 
      age: "" as any, 
      sex: undefined 
    });
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl border-t-4 border-t-primary overflow-hidden">
      <CardHeader className="bg-neutral-50 pb-6">
        <CardTitle className="text-2xl text-center font-heading text-primary-black">Calculate Your BMI</CardTitle>
        <CardDescription className="text-center">
          Enter your details below to get your Body Mass Index.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={unit} onValueChange={(v) => { setUnit(v as any); setResult(null); }} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metric">Metric (kg/cm)</TabsTrigger>
            <TabsTrigger value="imperial">Imperial (st/lb/ft)</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {unit === "metric" ? (
                  <Form {...metricForm}>
                    <form onSubmit={metricForm.handleSubmit(calculateMetric)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={metricForm.control}
                          name="heightCm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g. 175" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={metricForm.control}
                          name="weightKg"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g. 70" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <FormField
                          control={metricForm.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age (Optional)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g. 30" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={metricForm.control}
                          name="sex"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sex (Optional)</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row gap-4 pt-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="m-female" />
                                    <Label htmlFor="m-female">Female</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="m-male" />
                                    <Label htmlFor="m-male">Male</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-lg h-12" data-testid="button-calculate-metric">
                        Calculate BMI
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...imperialForm}>
                    <form onSubmit={imperialForm.handleSubmit(calculateImperial)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={imperialForm.control}
                          name="heightFt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (ft)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={imperialForm.control}
                          name="heightIn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>(in)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="9" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={imperialForm.control}
                          name="weightSt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (st)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="11" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={imperialForm.control}
                          name="weightLbs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>(lbs)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="4" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <FormField
                          control={imperialForm.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age (Optional)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g. 30" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={imperialForm.control}
                          name="sex"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sex (Optional)</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-row gap-4 pt-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="i-female" />
                                    <Label htmlFor="i-female">Female</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="i-male" />
                                    <Label htmlFor="i-male">Male</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-lg h-12" data-testid="button-calculate-imperial">
                        Calculate BMI
                      </Button>
                    </form>
                  </Form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="space-y-6"
              >
                <div className={`p-6 rounded-lg border-2 text-center space-y-2 ${result.color} animate-pulse-soft`}>
                  <p className="text-sm font-medium uppercase tracking-wide opacity-80">Your BMI is</p>
                  <div className="text-5xl font-bold font-heading tracking-tight">
                    {result.bmi}
                  </div>
                  <div className="text-xl font-bold mt-2">
                    {result.category}
                  </div>
                  <p className="mt-4 text-sm opacity-90 max-w-xs mx-auto">
                    {result.message}
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    This result is for information only. Please consult a healthcare professional for medical advice.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3 justify-center">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
                    <Share2 size={16} /> Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={saveAsPDF} className="gap-2">
                    <Download size={16} /> Save PDF
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
                    <RefreshCw size={16} /> Recalculate
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  );
}