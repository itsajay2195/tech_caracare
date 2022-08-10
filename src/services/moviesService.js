export const apiCall = async (
	route,
	body = {},
	method = "GET",
) => {
	// let headerObject = {
	//     'Content-Type': 'application/json',
	//   }; ----> not required for this assignment, out of scope
	// const headers = new Headers(headerObject);
	const requestURL = route;
	const requestDetails = {
		method,
		mode: "cors",
		// headers,  ----> not required for this assignment, out of scope
	};

	const request = new Promise((resolve, reject) => {
		fetch(requestURL, requestDetails)
			.then((data) => {
				// logger(data);
				// logger(requestURL, JSON.stringify(data));
				resolve(data);
			})
			.catch((err) => {
				// logger(err);
				reject(err);
			});
	});

	return new Promise((resolve, reject) => {
		request
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
