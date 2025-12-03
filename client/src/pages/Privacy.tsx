import Head from "@/components/Head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Privacy() {
  const [cookieConsent, setCookieConsent] = useState(true);

  return (
    <>
      <Head 
        title="Privacy Policy — nhs bmi calculator" 
        description="Our privacy policy explains how we handle your data and protect your privacy."
      />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
        
        <Card>
          <CardContent className="p-8 md:p-12 prose prose-lg max-w-none">
            <p>
              At <strong>nhs bmi calculator</strong>, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
            </p>

            <h3>1. Data Collection</h3>
            <p>
              <strong>Calculator Data:</strong> We do <strong>not</strong> store, save, or transmit the height, weight, age, or sex data you enter into the 
              <strong>nhs bmi calculator</strong>. All calculations are performed locally within your web browser. Once you refresh the page or close the tab, 
              that data is permanently deleted.
            </p>
            <p>
              <strong>Contact Forms:</strong> If you contact us via email or a contact form, we will collect your name, email address, and message content solely 
              for the purpose of responding to your inquiry.
            </p>

            <h3>2. Cookies</h3>
            <p>
              We use cookies to enhance your browsing experience and analyze our traffic.
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> We may use third-party services like Google Analytics to understand how users interact with our site. 
              These cookies collect anonymous data.</li>
            </ul>

            <h3>3. Third-Party Services</h3>
            <p>
              We may use third-party services for hosting, analytics, or content delivery. These providers have their own privacy policies. 
              We recommend reviewing them if you have concerns.
            </p>

            <h3>4. GDPR & Your Rights</h3>
            <p>
              Under the General Data Protection Regulation (GDPR) and UK data protection laws, you have the right to:
            </p>
            <ul>
              <li>Access personal data we hold about you (if any).</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data ("right to be forgotten").</li>
            </ul>
            <p>
              Since we do not store calculator data, we likely do not hold any personal data about you unless you have emailed us directly.
            </p>

            <h3>5. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: 
              <a href="mailto:privacy@nhsbmicalculator.mock" className="ml-1 text-primary no-underline hover:underline">privacy@nhsbmicalculator.mock</a>
            </p>

            <p className="mt-8 pt-8 border-t text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Simple Cookie Banner Demo */}
      {cookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 text-white p-4 z-50 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg transform transition-transform">
          <div className="text-sm">
            We use cookies to ensure you get the best experience on our website. <a href="/privacy" className="underline">Learn more</a>.
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setCookieConsent(false)}>
              Accept
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-white/20" onClick={() => setCookieConsent(false)}>
              Decline
            </Button>
          </div>
        </div>
      )}
    </>
  );
}