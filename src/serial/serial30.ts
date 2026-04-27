/* 
	РДобавьте обработку ошибок для невалидного XML.
*/

import * as sax from "sax";

// Исходный код
export function parseSafely(xml: string): { success: boolean; error?: string } {
  const parser = new sax.SAXParser(true);
  const result = { success: true, error: undefined as string | undefined };
  
  // TODO: Добавьте обработчик ошибок, который установит success = false и сохранит сообщение об ошибке
  parser.onerror = (error : Error) =>{
    result.error = error.message;
    result.success = false;
  };
  
  try {
    parser.write(xml).close();
  } catch (e) {
    result.success = false;
  }
  return result;
}

