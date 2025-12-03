import Head from "@/components/Head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Clock, MapPin, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Head 
        title="Contact Us — nhs bmi calculator" 
        description="Get in touch with the team behind nhs bmi calculator. We aim to reply within 48 hours."
      />
      
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions about the <strong>nhs bmi calculator</strong>, feedback on how we can improve, or found a bug? We'd love to hear from you. 
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" /> Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">For general inquiries regarding the calculator:</p>
                <a href="mailto:contact@nhsbmicalculator.mock" className="text-primary font-medium hover:underline">
                  contact@nhsbmicalculator.mock
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We value your feedback. We aim to reply to all legitimate inquiries regarding the <strong>nhs bmi calculator</strong> within <strong>48 hours</strong>, Monday to Friday.
                </p>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  London, United Kingdom
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="h-4 w-4 text-primary" /> Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p><strong>Found a bug?</strong> Please let us know which browser you are using.</p>
                <p><strong>Feature request?</strong> We are always adding new features to the <strong>nhs bmi calculator</strong>.</p>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" required />
                  </div>

                  {/* Honeypot for anti-spam */}
                  <div className="hidden">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="text-xs text-muted-foreground">
                    By submitting this form, you agree to our privacy policy. We will only use your details to reply to your message.
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}