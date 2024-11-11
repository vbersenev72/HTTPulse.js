import { Handler } from "../types";

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = '00'; 

    return `${year}-${month}-${day}-${hours}-${minutes}-00`;
}

export function logHandlers(handlers: Map<string, Handler>): void {
    handlers.forEach((handlerFn, handler) => {
        const handlerSplit = handler.split('#')
        const reset = '\x1b[0m'; 
        const blue = '\u001b[36m'; 
        
        console.log(
          formatDate(new Date()) + 
          ' DEBUG: ' + 
          blue + 'API' + reset + ' registered method' + ' ' + 
          blue + handlerSplit[0] + reset + ' ' + 
          blue + handlerSplit[1] + reset
        );
    })
}