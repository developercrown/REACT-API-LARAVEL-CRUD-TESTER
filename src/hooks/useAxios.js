import axios from 'axios';

const useAxios = () => {
    let headers = {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
    }

    const create = (server = null, withCredentials = false) => {
        return axios.create({
            baseURL: server ? server : process.env.REACT_APP_API_SHIELD,
            headers,
            withCredentials
        });
    }

    return {create}
}

export default useAxios;