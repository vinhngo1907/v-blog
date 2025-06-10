import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable "${key}" is undefined.`);
    }
    return value;
}

// App config
export function getAppConfig() {
    return {
        PORT: getEnv("PORT") || 5000,
        BASE_URL: getEnv("BASE_URL")
    };
}

// Database config
export function getDatabaseConfig() {
    return {
        HOST: getEnv("DB_HOST"),
        PORT: getEnv("DB_PORT"),
        USER: getEnv("DB_USER"),
        PASS: getEnv("DB_PASS"),
        NAME: getEnv("DB_NAME"),
        URL: getEnv("DB_URL")
    };
}

// JWT config
export function getJwtConfig() {
    return {
        REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
        ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
        ACTIVE_TOKEN_SECRET: getEnv("ACTIVE_TOKEN_SECRET")
    };
}

// Mail config
export function getMailConfig() {
    return {
        CLIENT_ID: getEnv("MAIL_CLIENT_ID"),
        CLIENT_SECRET: getEnv("MAIL_CLIENT_SECRET"),
        REFRESH_TOKEN: getEnv("MAIL_REFRESH_TOKEN"),
        SENDER_EMAIL: getEnv("SENDER_EMAIL_ADDRESS")
    };
}

// Twilio config
export function getTwilioConfig() {
    return {
        ACCOUNT_SID: getEnv("TWILIO_ACCOUNT_SID"),
        AUTH_TOKEN: getEnv("TWILIO_AUTH_TOKEN"),
        PHONE_NUMBER: getEnv("TWILIO_PHONE_NUMBER"),
        SERVICE_ID: getEnv("TWILIO_SERVICE_ID")
    };
}