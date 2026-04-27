/* 	
	Соберите все названия книг в массив.
	Пример XML в файле saxXML.ts
*/

import * as sax from "sax";

export function extractTitles(xml: string): string[] {
  const parser = new sax.SAXParser(true);
  const titles: string[] = [];
  let currentTitle = "";
  let isTitleTag = false;

  // TODO: Добавьте обработчики для:
  // - открытия тега title (установите isTitleTag = true)
  // - текстового содержимого (если isTitleTag, добавьте к currentTitle)
  // - закрытия тега title (добавьте currentTitle в titles и сбросьте значения)
  parser.onopentag = (node: sax.QualifiedTag) => {
    if(node.name === 'title')
      isTitleTag = true;
  };

  parser.ontext = (text: string) => {
    if(isTitleTag) currentTitle = text.trim();
  }

  parser.onclosetag = (tagName: string) => {
    if(tagName === 'title'){
        titles.push(currentTitle);
        currentTitle = "";
        isTitleTag = false;
    }
  }

  parser.write(xml).close();
  return titles;
}
