/* 
	Найти все элементы <li> внутри <ul class="menu">.
*/

import { select } from 'xpath';

export function findMenuListItems(doc: Document): Node[] {
  const query = "//ul[@class = 'menu']/li"; // Тут нужно написать XPath запрос
  return select(query, doc) as Node[];
}

