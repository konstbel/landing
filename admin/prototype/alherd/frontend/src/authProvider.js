export default {
    login         : async ({username, password}) => {
        let response = await fetch(
            'http://localhost:4000/login', {
                method  : 'POST',
                mode    : 'cors',
                cache   : 'no-cache',
                headers : {
                    'Content-Type': 'application/json',
                },
                referrer: 'no-referrer',
                body    : JSON.stringify({username, password}),
            }
        );
        let data     = await response.json();
        if (data.error) {
            return Promise.resolve();
        }
        localStorage.setItem('token', data.token);

        return Promise.resolve();
    },
    logout        : () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError    : ({status}) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth     : () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
};
