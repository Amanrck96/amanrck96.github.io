'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { profile } from '@/lib/data';

const formSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'.]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters')
    .toLowerCase(),
  mobile: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(val), 'Invalid mobile number format'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .refine((val) => !/<script|javascript:|on\w+=/i.test(val), 'Message contains potentially harmful content'),
});

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submitButton = document.getElementById('contact-submit-button') as HTMLButtonElement;
    const originalText = submitButton?.textContent || 'Send Message';
    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      // Switch to FormSubmit to avoid 'Form not found' errors
      const formSubmitUrl = `https://formsubmit.co/${profile.email}`;
      const payload = new URLSearchParams({
        name: values.name,
        email: values.email,
        mobile: values.mobile || '',
        message: values.message,
        _replyto: values.email,
        _subject: `Portfolio Contact: ${values.name}`,
      });

      const fsRes = await fetch(formSubmitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: payload.toString(),
      });

      const fsData = await fsRes.json().catch(() => null);

      if (fsRes.ok) {
        toast({
          title: 'Message Sent Successfully!',
          description: 'Thank you for reaching out. I will get back to you within 24 hours.',
          duration: 5000,
        });
        form.reset();
      } else {
        const errorMessage = (fsData && (fsData.error || fsData.message || (fsData.errors && fsData.errors[0]?.message))) || 'Failed to send message';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Failed to send message. Please try again or contact me directly.';
      if (error instanceof Error) {
        if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.';
        }
      }
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
        duration: 7000,
      });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        action={`https://formsubmit.co/${profile.email}`}
        method="POST"
        className="space-y-8"
      >
        <input type="hidden" name="_subject" value={`Portfolio Contact: ${form.getValues('name') || 'New Contact'}`} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://amanrck96.github.io/contact?success=true" />
        {/* Hidden fields for HTML fallback submissions and security */}
        <input type="hidden" name="_honeypot" value="" style={{ display: 'none' }} />
        <input type="hidden" name="_captcha" value="false" />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your Name" 
                  {...field} 
                  name="name" 
                  className="h-12 px-4 text-base" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your.email@example.com" 
                  {...field} 
                  name="email" 
                  className="h-12 px-4 text-base" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Mobile Number (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="+91 12345 67890" 
                  {...field} 
                  name="mobile" 
                  className="h-12 px-4 text-base" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="How can I help you today?" 
                  {...field} 
                  name="message"
                  rows={6}
                  className="resize-none px-4 py-3 text-base"
                />
              </FormControl>
              <div className="flex justify-between text-sm text-muted-foreground">
                <FormMessage />
                <span>{field.value?.length || 0}/2000</span>
              </div>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          id="contact-submit-button" 
          className="w-full h-12 text-base mt-4 transition-all"
        >
          Send Message <Send className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
}
