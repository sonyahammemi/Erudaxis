export class AuthService {
    async loginApi(username: string, password: string) {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        return response.json();
    }
}
