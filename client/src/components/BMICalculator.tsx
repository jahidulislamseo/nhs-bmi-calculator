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
import BMIResultCard from "@/components/BMIResultCard";

// Use strings for form inputs to allow easier typing and validation
const metricSchema = z.object({
  heightCm: z.string().min(1, "Height is required").refine(val => !isNaN(Number(val)) && Number(val) >= 50 && Number(val) <= 300, "Height must be between 50cm and 300cm"),
  weightKg: z.string().min(1, "Weight is required").refine(val => !isNaN(Number(val)) && Number(val) >= 2 && Number(val) <= 600, "Weight must be between 2kg and 600kg"),
  age: z.string().optional(),
  sex: z.enum(["male", "female"]).optional(),
});

const imperialSchema = z.object({
  heightFt: z.string().min(1, "Height (ft) is required").refine(val => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 9, "Height must be between 1ft and 9ft"),
  heightIn: z.string().optional().refine(val => !val || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 11), "Inches must be 0-11"),
  weightSt: z.string().optional().refine(val => !val || (!isNaN(Number(val)) && Number(val) >= 0), "Stones must be positive"),
  weightLbs: z.string().min(1, "Weight (lbs) is required").refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Lbs must be positive"),
  age: z.string().optional(),
  sex: z.enum(["male", "female"]).optional(),
});

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [result, setResult] = useState<BMIResult | null>(null);

  const metricForm = useForm<z.infer<typeof metricSchema>>({
    resolver: zodResolver(metricSchema),
    defaultValues: { 
      heightCm: "", 
      weightKg: "", 
      age: "", 
      sex: undefined 
    },
    mode: "onChange"
  });

  const imperialForm = useForm<z.infer<typeof imperialSchema>>({
    resolver: zodResolver(imperialSchema),
    defaultValues: { 
      heightFt: "", 
      heightIn: "", 
      weightSt: "", 
      weightLbs: "", 
      age: "", 
      sex: undefined 
    },
    mode: "onChange"
  });

  const calculateMetric = (data: z.infer<typeof metricSchema>) => {
    const heightCm = Number(data.heightCm);
    const weightKg = Number(data.weightKg);
    const bmi = calculateMetricBMI(heightCm, weightKg);
    // Pass height in meters and weight in kg for extended stats
    setResult(interpretBMI(bmi, heightCm / 100, weightKg));
  };

  const calculateImperial = (data: z.infer<typeof imperialSchema>) => {
    const heightFt = Number(data.heightFt);
    const heightIn = Number(data.heightIn || 0);
    const weightSt = Number(data.weightSt || 0);
    const weightLbs = Number(data.weightLbs);
    
    const bmi = calculateImperialBMI(heightFt, heightIn, weightSt, weightLbs);
    
    // Convert imperial inputs to metric for extended stats
    // 1 inch = 0.0254 meters
    const totalInches = (heightFt * 12) + heightIn;
    const heightM = totalInches * 0.0254;
    
    // 1 lb = 0.453592 kg
    const totalLbs = (weightSt * 14) + weightLbs;
    const weightKg = totalLbs * 0.453592;

    setResult(interpretBMI(bmi, heightM, weightKg));
  };

  const saveAsPDF = () => {
    alert("This would trigger a PDF download in a production environment.");
  };

  const reset = () => {
    setResult(null);
    metricForm.reset({ 
      heightCm: "", 
      weightKg: "", 
      age: "", 
      sex: undefined 
    });
    imperialForm.reset({ 
      heightFt: "", 
      heightIn: "", 
      weightSt: "", 
      weightLbs: "", 
      age: "", 
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
                                <Input type="text" inputMode="numeric" placeholder="e.g. 175" {...field} />
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
                                <Input type="text" inputMode="numeric" placeholder="e.g. 70" {...field} />
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
                                <Input type="text" inputMode="numeric" placeholder="e.g. 30" {...field} />
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
                                <Input type="text" inputMode="numeric" placeholder="5" {...field} />
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
                                <Input type="text" inputMode="numeric" placeholder="9" {...field} />
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
                                <Input type="text" inputMode="numeric" placeholder="11" {...field} />
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
                                <Input type="text" inputMode="numeric" placeholder="4" {...field} />
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
                                <Input type="text" inputMode="numeric" placeholder="e.g. 30" {...field} />
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
              >
                <BMIResultCard result={result} unit={unit} onSavePdf={saveAsPDF} />
                
                <div className="flex gap-3 justify-center mt-6">
                  <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
                    <RefreshCw size={16} /> Calculate Again
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