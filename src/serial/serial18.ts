/* 	
  Найти все элементы с текстом "Submit".
*/

import { select } from "xpath";

export function findElementsWithExactText(doc: Document): Node[] {
  const query = "//*[text() = 'Submit']"; // Тут нужно написать XPath запрос
  return select(query, doc) as Node[];
}
