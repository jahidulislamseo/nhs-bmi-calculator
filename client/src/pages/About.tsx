import Head from "@/components/Head";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <Head 
        title="About Us — nhs bmi calculator" 
        description="Learn about the mission and purpose behind the nhs bmi calculator tool."
      />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">About Us</h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8 md:p-12 prose prose-lg max-w-none">
            <h2 className="text-2xl font-heading font-semibold text-foreground">Our Mission</h2>
            <p>
              Our mission is simple: to provide a fast, accessible, and easy-to-use tool for anyone wanting to check their Body Mass Index. 
              The <strong>nhs bmi calculator</strong> was built to help users quickly assess their weight status in the privacy of their own home. 
              We believe that understanding your basic health metrics is the first step towards a healthier lifestyle.
            </p>

            <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">Why Use This Tool?</h2>
            <p>
              In today's fast-paced world, health information can be overwhelming. We stripped away the clutter to focus on one thing: 
              delivering accurate BMI calculations instantly. Whether you prefer metric (kg/cm) or imperial (st/lb/ft) units, 
              our calculator adapts to your needs.
            </p>

            <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">Trust & Privacy</h2>
            <p>
              We understand that health data is sensitive. That's why the <strong>nhs bmi calculator</strong> is designed with privacy first. 
              <strong>We do not store any of the data you enter into the calculator.</strong> All calculations happen directly in your browser. 
              Once you close the page, your data is gone.
            </p>
            
            <p className="italic text-sm text-muted-foreground mt-8 border-t pt-4">
              Note: While we strive for accuracy, the team behind this tool are developers and UX designers, not doctors. 
              This website is for informational purposes only.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}