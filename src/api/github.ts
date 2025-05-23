export const sendGetRepoList = async (token:string) => {
    const response = await fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return response
}

export const sendCreateRepo = async (token:string, owner: string, data: {name: string, description: string, private: boolean}) => {
    const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
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

export const sendUpdateRepo = async (token:string, owner: string, data: {name: string, description: string, private: boolean}) => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${data.name}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            //name: data.name,
            description: data.description,
            private: data.private,
        }),
    });
    return response;
}

export const sendDeleteRepo = async (token:string, owner: string, data: {name: string}) => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${data.name}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return response;
}

export const sendLogin = async (token:string) => {
    const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        }
    });
    return response;
}

export default {
    sendCreateRepo,
    sendDeleteRepo,
    sendUpdateRepo,
    sendGetRepoList,
    sendLogin
}
