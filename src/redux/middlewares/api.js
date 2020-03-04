import { apiStart, apiEnd, apiError } from '../actions';
const baseUrl = process.env.REACT_APP_BASE_URL;

const createUrl = (path, urlParams = [], queryParams = {}) => {
    const apiKey = process.env.REACT_APP_ACCU_WEATHER_API_KEY;

    let url = new URL(path, baseUrl);

    urlParams.forEach(param => {
        url = new URL(param, url);
    });

    url.searchParams.set("apikey", apiKey);

    Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.set(key, value)
    })

    return url;
}

export const api = ({ getState, dispatch }) => next =>
    async (action) => {
        next(action);

        if (action.type !== 'API')
            return;

        try {
            dispatch(apiStart());

            const {
                url,
                body,
                urlParams = [],
                queryParams = {},
                method = 'GET',
                onSuccess,
                onFailure
            } = action.payload;

            const response = await fetch(createUrl(url, urlParams, queryParams), {
                method: method.toUpperCase(),
                body: JSON.stringify(body),
                mode: 'cors',
                cache: "no-cache",
                credentials: "same-origin",
            })

            if (response.ok) {
                const data = await response.json()
                onSuccess && dispatch(onSuccess(data))
            }
            else {
                onFailure && dispatch(onFailure(response.status))
            }
        }
        catch (error) {
            console.log('[api middleware]:', error)
            dispatch(apiError(error))
        }
        finally {
            dispatch(apiEnd())
        }
    }