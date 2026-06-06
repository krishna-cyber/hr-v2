export interface OtpTemplateContext {
  otp: string;
}

export interface WelcomeTemplateContext {
  firstName: string;
  email: string;
  password: string;
  loginUrl: string;
}

export interface ForgotPasswordTemplateContext {
  firstName: string;
  code: string;
}
