/* 
	Реализовать функцию calculateOrderTotal(xmlDoc), которая принимает 
  XML-документ xmlDoc и возвращает общую стоимость заказа.

	Пример XML:
<order id="123">
  <items>
    <item productId="1" price="100" quantity="2"/>
    <item productId="2" price="50" quantity="3"/>
    <item productId="3" price="200" quantity="1"/>
  </items>
</order>
*/

export interface OrderWithPrices {
  id: string;
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export function calculateOrderTotal(xmlDoc: Document): number {
  let sum : number = 0;  
  const item = xmlDoc.getElementsByTagName("item");

    for(let i = 0; i < item.length; i++){
        let price : number = Number(item[i].getAttribute("price")?.toString()) * Number(item[i].getAttribute("quantity")?.toString());
        sum += price;
    }

    return sum;
}