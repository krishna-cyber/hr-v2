/* eslint-disable @typescript-eslint/no-unsafe-return */
import { plainToInstance, Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty({ message: 'DB_URL is required' })
  DB_URL!: string;

  @IsNumber()
  @Transform(({ value }) => Number.parseInt(value, 10))
  PORT: number = 4000;

  @IsEnum(Environment)
  @Transform(({ value }) => value || 'development')
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  @IsNotEmpty({ message: 'JWT_SECRET_KEY is required' })
  // @MinLength(8, {
  //   message: "JWT_SECRET_KEY must be at least 8 characters long",
  // })
  JWT_SECRET_KEY!: string;

  @IsString()
  @IsNotEmpty({ message: 'GOOGLE_CLIENT_ID is required' })
  GOOGLE_CLIENT_ID!: string;

  @IsString()
  @IsNotEmpty({ message: 'GOOGLE_CLIENT_SECRET is required' })
  GOOGLE_CLIENT_SECRET!: string;

  @IsString()
  @IsNotEmpty({ message: 'GOOGLE_CALLBACK_URL is required' })
  @IsUrl(
    { require_tld: false },
    { message: 'GOOGLE_CALLBACK_URL must be a valid URL' },
  )
  GOOGLE_CALLBACK_URL!: string;

  @IsString()
  @IsNotEmpty({ message: 'CLIENT_URL is required' })
  @IsUrl({ require_tld: false }, { message: 'CLIENT_URL must be a valid URL' })
  CLIENT_URL!: string;
  @IsString()
  @IsNotEmpty({ message: 'BASE_URL is required' })
  @IsUrl({ require_tld: false }, { message: 'BASE_URL must be a valid URL' })
  BASE_URL!: string;

  @IsString()
  GMAIL_HOST: string = 'smtp.gmail.com';

  @IsNumber()
  @Transform(({ value }) => Number.parseInt(value, 10) || 587)
  GMAIL_PORT: number = 587;

  @IsEmail({}, { message: 'GMAIL_USER must be a valid email' })
  @IsNotEmpty({ message: 'GMAIL_USER is required' })
  GMAIL_USER!: string;

  @IsString()
  @IsNotEmpty({ message: 'GMAIL_PASS is required' })
  GMAIL_PASS!: string;

  @IsString()
  @IsNotEmpty({ message: 'slack bot token is required' })
  SLACK_BOT_TOKEN!: string;
  @IsString()
  @IsNotEmpty({ message: 'slack channel id is required' })
  SLACK_CHANNEL_ID!: string;

  @IsString()
  @IsNotEmpty({ message: 'slack general channel id is required' })
  SLACK_GENERAL_CHANNEL_ID!: string;

  @IsString()
  @IsNotEmpty({ message: 'github token is required' })
  GITHUB_ACCESS_TOKEN!: string;

  @IsString()
  @IsNotEmpty({ message: 'github org name is required' })
  GITHUB_ORG_NAME!: string;
  @IsString()
  @IsNotEmpty({ message: 'SLACK_SIGNING_SECRET is required' })
  SLACK_SIGNING_SECRET!: string;
  @IsString()
  @IsNotEmpty({ message: 'Redis host is required' })
  REDIS_HOST!: string;
  @IsString()
  @IsNotEmpty({ message: 'Redis PORT is required' })
  REDIS_PORT!: string;
  @IsString()
  REDIS_PASSWORD?: string;
  @IsString()
  REDIS_USERNAME?: string;
  @IsString()
  REDIS_TLS?: string;
  @IsString()
  TECH_LEAD_EMAIL?: string;
  @IsString()
  SLACK_GITHUB_ACCESS_CHANNEL_ID?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
