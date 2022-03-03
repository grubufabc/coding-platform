import React from 'react';

function useFetch() {
	const [data, setData] = React.useState<string | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	const request = React.useCallback(async (url: string, options: any) => {
		let response, json;
		try {
			setError(null);
			setLoading(true);
			response = await fetch(url, options);
			json = await response.json();
			if (response.ok === false) throw new Error(json.message);
		} catch (err) {
			json = null;
			setError((err as any).message);
		} finally {
			setData(json);
			setLoading(false);
			return { response, json };
		}
	}, []);

	return {
		data,
		error,
		loading,
		request,
	};
}

export default useFetch;
