import Head from "@/components/Head";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <Head 
        title="About Us — nhs bmi calculator" 
        description="Learn about the mission, purpose, and team behind the nhs bmi calculator tool. Dedicated to simplifying health metrics."
        canonical="https://replit.com/about"
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
              We believe that understanding your basic health metrics is the first step towards a healthier lifestyle. We aim to demystify health data 
              and make it accessible to everyone, regardless of their technical knowledge or medical background.
            </p>

            <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">Why Use This Tool?</h2>
            <p>
              In today's fast-paced world, health information can be overwhelming. We stripped away the clutter to focus on one thing: 
              delivering accurate BMI calculations instantly. Whether you prefer metric (kg/cm) or imperial (st/lb/ft) units, 
              our calculator adapts to your needs. The <strong>nhs bmi calculator</strong> is designed to be responsive, meaning it works perfectly 
              on your mobile phone, tablet, or desktop computer, allowing you to check your stats whenever and wherever you need.
            </p>

            <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">Our Commitment to Accuracy</h2>
            <p>
              We use the standard World Health Organization (WHO) formulas for calculating Body Mass Index. This ensures that the results 
              you get from the <strong>nhs bmi calculator</strong> are consistent with global health standards. While we are not a medical institution, 
              we take great care in ensuring our code is robust and our educational content is helpful and grounded in generally accepted health guidelines.
            </p>

            <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">Trust & Privacy</h2>
            <p>
              We understand that health data is sensitive. That's why the <strong>nhs bmi calculator</strong> is designed with privacy first. 
              <strong>We do not store any of the data you enter into the calculator.</strong> All calculations happen directly in your browser. 
              Once you close the page, your data is gone. We do not track individual users' health metrics, and we do not sell data to third parties.
              Your trust is paramount to us.
            </p>
            
            <div className="mt-10 bg-neutral-50 p-6 rounded-lg border border-neutral-200">
              <h3 className="text-xl font-heading font-semibold mb-2 mt-0">Who We Are</h3>
              <p className="mb-0 text-sm">
                We are a small team of passionate web developers and UX designers dedicated to building useful digital tools for everyday life. 
                We noticed that many health calculators online were cluttered with ads, slow to load, or confusing to use. We built the 
                <strong>nhs bmi calculator</strong> to solve that problem—providing a clean, professional, and ad-free experience for users seeking 
                quick health answers.
              </p>
            </div>

            <p className="italic text-sm text-muted-foreground mt-8 border-t pt-4">
              Note: While we strive for accuracy, the team behind this tool are developers and UX designers, not doctors. 
              This website is for informational purposes only and does not constitute medical advice. Please consult a qualified healthcare provider for any medical concerns.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}