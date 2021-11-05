export const getCorrectValue = (price: number, count: number): number => {
	return Math.floor(((price * Number(count)) * 100) / 100);
};
