/* 	
	Создайте функцию getDiscountedInStockTotal, которая возвращает общую стоимость 
	всех товаров в корзине, которые есть в наличии и имеют скидку.
*/

export type Product = { price: number; discount: boolean; inStock: boolean };

export function getDiscountedInStockTotal(products: Product[]): number {
	return products.
	filter(product => product.discount && product.inStock).
	reduce((acc, product) => {
		acc += product.price
		return acc;
	}, 0);

}
