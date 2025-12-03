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
        description="Our privacy policy explains how we handle your data, cookies, and protect your privacy while using the nhs bmi calculator."
        canonical="https://replit.com/privacy"
      />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
        
        <Card>
          <CardContent className="p-8 md:p-12 prose prose-lg max-w-none">
            <p>
              At <strong>nhs bmi calculator</strong>, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information 
              when you use our website. We are committed to ensuring that your privacy is protected.
            </p>

            <h3>1. Data Collection and Usage</h3>
            <p>
              <strong>Calculator Data:</strong> We do <strong>not</strong> store, save, or transmit the height, weight, age, or sex data you enter into the 
              <strong>nhs bmi calculator</strong> tool. All calculations are performed locally within your web browser using JavaScript. 
              Once you refresh the page or close the tab, that data is permanently deleted from your device's memory. We have no access to this information.
            </p>
            <p>
              <strong>Contact Forms:</strong> If you choose to contact us via email or our online contact form, we will collect your name, email address, and the content of your message 
              solely for the purpose of responding to your inquiry. This data is kept secure and is not used for marketing purposes without your explicit consent.
            </p>

            <h3>2. Cookies and Tracking</h3>
            <p>
              We use cookies to enhance your browsing experience, personalize content, and analyze our traffic.
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be switched off in our systems.</li>
              <li><strong>Analytics Cookies:</strong> We may use third-party services like Google Analytics to understand how users interact with our site. 
              These cookies collect anonymous data about page visits, time on site, and the region you are visiting from. This helps us improve the <strong>nhs bmi calculator</strong> 
              to better serve our users.</li>
              <li><strong>Preference Cookies:</strong> These enable the website to remember information that changes the way the website behaves or looks, like your preferred language.</li>
            </ul>

            <h3>3. Third-Party Services</h3>
            <p>
              We may use third-party services for hosting, analytics, or content delivery. These providers have their own privacy policies. 
              We recommend reviewing them if you have concerns. We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information.
            </p>

            <h3>4. GDPR & Your Rights</h3>
            <p>
              Under the General Data Protection Regulation (GDPR) and UK data protection laws, you have specific rights regarding your personal data:
            </p>
            <ul>
              <li><strong>Right to Access:</strong> You have the right to request copies of your personal data (if we hold any).</li>
              <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions ("right to be forgotten").</li>
              <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
            </ul>
            <p>
              Since we do not store calculator data, we likely do not hold any personal data about you unless you have emailed us directly.
            </p>

            <h3>5. Data Security</h3>
            <p>
              We have implemented security measures designed to protect the personal information you share with us, including physical, electronic, and procedural measures. 
              The <strong>nhs bmi calculator</strong> uses HTTPS (SSL/TLS) encryption to ensure that the connection between your browser and our server is secure.
            </p>

            <h3>6. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at: 
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
            We use cookies to ensure you get the best experience on our <strong>nhs bmi calculator</strong>. <a href="/privacy" className="underline">Learn more</a>.
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