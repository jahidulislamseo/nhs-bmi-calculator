import Head from "@/components/Head";
import BMICalculator from "@/components/BMICalculator";
import heroBg from "@assets/generated_images/subtle_abstract_medical_background_pattern.png";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "nhs bmi calculator",
    "url": "https://replit.com",
    "description": "Free tool to calculate Body Mass Index (BMI).",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any"
  };

  return (
    <>
      <Head 
        title="nhs bmi calculator — Fast & Accurate BMI Tool" 
        description="Use the free nhs bmi calculator to check your body mass index quickly. Metric & imperial inputs, BMI categories, and health guidance."
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-black leading-tight">
                nhs bmi calculator — <span className="text-primary">Check your BMI in seconds</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Quick, easy, and accurate BMI results. Enter height & weight in metric or imperial units to understand your health better.
              </p>
              <div className="pt-4 hidden lg:block">
                <p className="text-sm text-muted-foreground mb-2">Trusted by users for fast checks.</p>
                <div className="flex gap-2 items-center text-sm font-medium">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">No Signup</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Instant Results</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Secure</span>
                </div>
              </div>
            </div>

            <div className="w-full">
              <BMICalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Understanding Your BMI</h2>
            <p>
              The <strong>nhs bmi calculator</strong> is a useful tool to check if you are a healthy weight for your height. 
              Body Mass Index (BMI) is a measure that uses your height and weight to work out if your weight is healthy. 
              The BMI calculation divides an adult's weight in kilograms by their height in metres squared.
            </p>
            
            <h3 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">Who should use the nhs bmi calculator?</h3>
            <p>
              This tool is suitable for most adults aged 18 and over. It provides a general indication of whether you're 
              carrying too much weight. However, it's not a diagnostic tool. Muscle mass, age, and ethnicity can all 
              affect the accuracy of BMI results.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">BMI Categories</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Underweight:</strong> BMI below 18.5</li>
              <li><strong>Healthy weight:</strong> BMI between 18.5 and 24.9</li>
              <li><strong>Overweight:</strong> BMI between 25 and 29.9</li>
              <li><strong>Obese:</strong> BMI of 30 or greater</li>
            </ul>
            
            <div className="bg-neutral-50 p-6 rounded-lg border-l-4 border-primary mt-8">
              <p className="font-medium text-foreground m-0">
                <strong>Note:</strong> If the <strong>nhs bmi calculator</strong> suggests you are outside the healthy range, 
                consider consulting a GP or healthcare professional for advice tailored to your specific circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50" id="faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border px-6">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium text-left">What is BMI?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                BMI stands for Body Mass Index. It is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium text-left">Is BMI accurate for everyone?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No, BMI has limitations. It does not distinguish between excess fat, muscle, or bone mass, nor does it provide any indication of the distribution of fat among individuals. It may not be accurate for athletes, pregnant women, or the elderly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium text-left">Should I rely on this tool for medical decisions?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. The <strong>nhs bmi calculator</strong> is an informational tool only. You should never rely on this tool for medical diagnosis or decisions. Always consult a qualified healthcare professional for medical advice.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}