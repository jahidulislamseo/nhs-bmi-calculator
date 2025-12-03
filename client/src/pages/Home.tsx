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
                Quick, easy, and accurate BMI results. Enter height & weight in metric or imperial units to understand your health better with our trusted <strong>nhs bmi calculator</strong> tool.
              </p>
              <div className="pt-4 hidden lg:block">
                <p className="text-sm text-muted-foreground mb-2">Trusted by thousands for fast health checks.</p>
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
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Understanding Your BMI Result</h2>
            <p>
              The <strong>nhs bmi calculator</strong> is a powerful yet simple tool designed to help you determine if you are a healthy weight for your height. 
              Body Mass Index (BMI) is a widely used measure that uses your height and weight to work out if your weight is healthy. 
              The BMI calculation divides an adult's weight in kilograms by their height in metres squared. By using this <strong>nhs bmi calculator</strong>, 
              you can quickly get an indication of your body fatness and potential health risks.
            </p>
            
            <h3 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">Why is calculating BMI important?</h3>
            <p>
              Knowing your BMI is a great starting point for understanding your general health. Being underweight, overweight, or obese can increase your risk of developing certain health conditions.
              For example, carrying excess weight can increase the risk of type 2 diabetes, heart disease, and stroke. Conversely, being underweight could suggest nutritional deficiencies or other health issues.
              Our <strong>nhs bmi calculator</strong> provides an immediate estimate, allowing you to take proactive steps towards a healthier lifestyle.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">How to measure yourself accurately</h3>
            <p>
              To get the most accurate result from the <strong>nhs bmi calculator</strong>, you need precise measurements:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Height:</strong> Stand tall against a flat wall without shoes. Look straight ahead and have someone measure from the floor to the top of your head.</li>
              <li><strong>Weight:</strong> Use a reliable digital scale. Weigh yourself at the same time of day, ideally in the morning before eating and without heavy clothing.</li>
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">Who should use the nhs bmi calculator?</h3>
            <p>
              This tool is suitable for most adults aged 18 and over. It provides a general indication of whether you're 
              carrying too much weight. However, it's not a diagnostic tool. Muscle mass, age, and ethnicity can all 
              affect the accuracy of BMI results. For instance, athletes with high muscle mass might be classified as "overweight" by a standard BMI chart, even if their body fat is low.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">BMI Categories Explained</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Underweight (Below 18.5):</strong> You may be not eating enough or you may be ill. It's advisable to consult a doctor.</li>
              <li><strong>Healthy weight (18.5 - 24.9):</strong> You are at a healthy weight for your height. By maintaining a healthy weight, you lower your risk of developing serious health problems.</li>
              <li><strong>Overweight (25 - 29.9):</strong> You may be slightly heavier than is healthy. Losing a small amount of weight can have health benefits.</li>
              <li><strong>Obese (30 or greater):</strong> Your health may be at risk. It is recommended to speak to a healthcare professional for advice on safe weight loss.</li>
            </ul>
            
            <div className="bg-neutral-50 p-6 rounded-lg border-l-4 border-primary mt-8">
              <p className="font-medium text-foreground m-0">
                <strong>Note:</strong> If the <strong>nhs bmi calculator</strong> suggests you are outside the healthy range, 
                don't panic. This result is just one indicator of health. Consider consulting a GP or healthcare professional for advice tailored to your specific circumstances.
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
              <AccordionTrigger className="text-lg font-medium text-left">What is BMI and how is it calculated?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                BMI stands for Body Mass Index. It is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared. Our <strong>nhs bmi calculator</strong> does this math for you instantly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium text-left">Is BMI accurate for everyone?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No, BMI has limitations. It does not distinguish between excess fat, muscle, or bone mass, nor does it provide any indication of the distribution of fat among individuals. It may not be accurate for athletes, pregnant women, or the elderly. However, for the general population, the <strong>nhs bmi calculator</strong> is a useful screening tool.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium text-left">Should I rely on this tool for medical decisions?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. The <strong>nhs bmi calculator</strong> is an informational tool only. You should never rely on this tool for medical diagnosis or decisions. Always consult a qualified healthcare professional for medical advice regarding your specific health needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium text-left">Can I use this calculator for children?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                This specific tool is designed for adults aged 18 and over. For children and young people aged 2 to 18, the BMI calculation takes into account age and gender, as children's body composition changes as they grow. Please use a child-specific growth chart or calculator.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}