const LoginService = {
    auth(user, password) {
        return fetch(process.env.React_App_SERVER_URL + 'auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
                password: password,
            }),
        }).then(r => r.json());
    },
};

export default LoginService;
