export const sumTriangle = (values: number[][]) => {
	let sum: number = 0;
	let lastIndex: number = 0;
	let indexArr: number[] = [];

	for (let i = 0; i < values.length; i++) {
		let arr = values[i];
		let maxArr = Math.max(...arr.slice(lastIndex, lastIndex + 2));
		sum += maxArr;
		lastIndex = arr.indexOf(maxArr, lastIndex);

		indexArr.push(lastIndex);
	}

	return {
        arr: values,
		sum,
		path: indexArr,
	};
};
