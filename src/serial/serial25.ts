/* 	
  Дан код, который должен подсчитывать общее количество тегов <book>. Завершите реализацию функции countBooks.
	Пример XML в файле saxXML.ts
*/

import { SAXParser, type QualifiedTag } from 'sax';

// Исходный код
export function countBooks(xml: string): number {
  const parser = new SAXParser(true);
  let count = 0;

  // TODO: Добавьте обработчик события открытия тега
  // Если имя тега - 'book', увеличивайте count
  parser.onopentag = (node: QualifiedTag) => {
    if(node.name === 'book'){
      count++;
    }
  };
  parser.write(xml).close();
  return count;
}
