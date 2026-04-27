/* 
	Доработайте код для сбора всех ID книг в массив.
	Пример XML в файле saxXML.ts
*/

import * as sax from "sax";

// Исходный код
export function collectBookIds(xml: string): string[] {
  const parser = new sax.SAXParser(true);
  const ids: string[] = [];
  // TODO: При открытии тега 'book' добавляйте значение атрибута 'id' в массив ids
   parser.onopentag = (node) => {
    if (node.name === 'book') {
      const bookId = node.attributes['id'];
      if (bookId) {
        ids.push(String(bookId));
      }
    }
  };
  
  parser.write(xml).close();
  return ids;
}
