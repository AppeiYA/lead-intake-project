import dotenv from 'dotenv'

dotenv.config()

function requireEnv(variable:string) {
    var value = process.env[variable]
    if(!value){
        console.log(`${variable} is required in .env`)
        process.exit(1)
    }else{
        return value
    }
}

function getEnv(variable: string, fallback:string): string {
    var value = process.env[variable]
    if (!value) {
        return fallback
    }else{
        return value
    }
}

export const Env = {
    Port: getEnv("PORT", "3000"),
    AnyMailApiKey: requireEnv("ANYMAIL_API_KEY"),
    AnyMailApiUrl: requireEnv("ANYMAIL_API_URL")
}