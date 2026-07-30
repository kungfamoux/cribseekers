import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailJSService {
  private readonly logger = new Logger(EmailJSService.name);
  private readonly serviceId: string;
  private readonly templateId: string;
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor() {
    this.serviceId = process.env.EMAILJS_SERVICE_ID || 'service_wljy577';
    this.templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_k73gvsq';
    this.publicKey = process.env.EMAILJS_PUBLIC_KEY || 'kCFhqBSWoyMXJXn10';
    this.privateKey = process.env.EMAILJS_PRIVATE_KEY || 'wA4jn8dkSvUlLtoQHfx40';

    if (this.serviceId && this.templateId && this.publicKey && this.privateKey) {
      this.logger.log('EmailJSService initialized with credentials');
    } else {
      this.logger.warn('EmailJS configuration missing. Email sending will be disabled.');
    }
  }

  async sendVerificationEmail(email: string, code: string): Promise<{ success: boolean; error?: string }> {
    if (!this.serviceId || !this.templateId || !this.publicKey || !this.privateKey) {
      this.logger.warn('EmailJS not configured, skipping email send');
      return { success: false, error: 'EmailJS not configured' };
    }

    try {
      // Using EmailJS REST API
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: this.serviceId,
          template_id: this.templateId,
          user_id: this.publicKey,
          template_params: {
            to_email: email,
            verification_code: code,
          },
          accessToken: this.privateKey,
        }),
      });

      if (response.ok) {
        this.logger.log(`Verification email sent successfully to ${email}`);
        return { success: true };
      } else {
        const errorText = await response.text();
        this.logger.error(`Failed to send email: ${response.status} - ${errorText}`);
        return { success: false, error: `EmailJS returned status ${response.status}` };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error sending verification email: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  isConfigured(): boolean {
    return !!(this.serviceId && this.templateId && this.publicKey && this.privateKey);
  }
}
