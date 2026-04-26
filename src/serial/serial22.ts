/* 	
	Найти все элементы, у которых атрибут class содержит слово "error".
*/

import { select } from "xpath";

export function findErrorElements(doc: Document): Node[] {
  const query = "//*[contains(@class, 'error')]"; // Тут нужно написать XPath запрос
  return select(query, doc) as Node[];
}
