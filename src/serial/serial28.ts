/* 	
	Проверьте, что каждый тег <book> имеет атрибут id.
	Пример XML в файле saxXML.ts
*/

import * as sax from "sax";

// Исходный код
export function validateBookStructure(xml: string): boolean {
  const parser = new sax.SAXParser(true);
  let isValid = true;

  // TODO: Если встречается тег 'book' без атрибута 'id', установите isValid = false
  parser.onopentag = (node : sax.QualifiedTag) => {
      if(node.name === 'book'){
        if(!node.attributes['id']){
          isValid = false;
        }
      }
  };
  parser.write(xml).close();
  return isValid;
}
