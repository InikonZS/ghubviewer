const createRepo = async (data: {name: string, description: string, private: boolean}) => {
    const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
            'Authorization': `token ${this.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            description: data.description,
            private: data.private,
        }),
    });
    return response;
}
