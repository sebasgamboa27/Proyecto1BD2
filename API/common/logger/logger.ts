export class Logger {
    
    public static info(logText: string): void {
        console.log({"date" : new Date(), "level": "info", "message":logText}) 
    }

    public static debug(logText: string): void {
        console.log({"date" : new Date(), "level": "debug", "message":logText}) 
    }

    public static error(logText: string): void {
        console.log({"date" : new Date(), "level": "error", "message":logText}) 
    }
}