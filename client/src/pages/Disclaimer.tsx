import Head from "@/components/Head";
import { Card, CardContent } from "@/components/ui/card";

export default function Disclaimer() {
  return (
    <>
      <Head 
        title="Medical Disclaimer — nhs bmi calculator" 
        description="Important medical disclaimer regarding the use of the nhs bmi calculator tool."
      />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Medical Disclaimer</h1>
        
        <Card>
          <CardContent className="p-8 md:p-12 prose prose-lg max-w-none">
            <p className="lead text-xl text-muted-foreground">
              Please read this disclaimer carefully before using the <strong>nhs bmi calculator</strong>.
            </p>

            <h3>1. No Medical Advice</h3>
            <p>
              The <strong>nhs bmi calculator</strong> and the content on this website are provided for general informational 
              and educational purposes only. It is <strong>not</strong> intended to amount to advice on which you should rely. 
              The information on this site is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              Always seek the advice of your physician, general practitioner (GP), or other qualified health provider 
              with any questions you may have regarding a medical condition. Never disregard professional medical advice 
              or delay in seeking it because of something you have read on this website.
            </p>

            <h3>2. Accuracy of Information</h3>
            <p>
              While we strive to ensure the accuracy of the BMI calculations provided by the <strong>nhs bmi calculator</strong>, 
              we make no representations, warranties, or guarantees, whether express or implied, that the content on our site 
              is accurate, complete, or up-to-date. BMI is a screening tool, not a diagnostic of the body fatness or health 
              of an individual.
            </p>

            <h3>3. Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by applicable law, we exclude all conditions, warranties, and representations 
              in relation to this website. We will not be liable for any loss or damage, whether in contract, tort (including negligence), 
              breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with the use of, 
              or inability to use, our site or the use of or reliance on any content displayed on our site.
            </p>
            <p>
              Specifically, we accept no liability for any health decisions made based on the results provided by this calculator.
            </p>

            <h3>4. Not a Medical Device</h3>
            <p>
              This website and the tools within it are not classified as medical devices. They are simple mathematical tools 
              based on publicly available formulas (weight divided by height squared).
            </p>

            <p className="mt-8 pt-8 border-t text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}