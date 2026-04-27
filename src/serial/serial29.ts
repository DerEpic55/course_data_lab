/* 
	Найдите книгу с ID=2 и верните её название.
	Пример XML в файле saxXML.ts
*/

import * as sax from "sax";


export function findBookById(xml: string, targetId: string): string | null {
  const parser = new sax.SAXParser(true);
  let currentId:string | sax.QualifiedAttribute = '';
  let currentTitle = '';
  let foundBook = false;
  let isTitleTag = false;
  
// TODO: Реализуйте логику поиска книги по ID и извлечения её названия
  parser.onopentag = (node: sax.QualifiedTag) => {
    if(node.name === 'book'){
      currentId = String(node.attributes['id']);
    }
    if(node.name === 'title'){
      isTitleTag = true;
    }
  };

  parser.ontext = (text : string) => {
    if(isTitleTag === true && currentId === targetId){
      foundBook = true;
      currentTitle = text.trim();
    }
  };

  parser.onclosetag = (tagName : string) => {
      if(tagName === 'title'){
        isTitleTag = false;
      }
  }

  parser.write(xml).close();
  return foundBook ? currentTitle.trim() : null;
}