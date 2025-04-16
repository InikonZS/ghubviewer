export interface IServerRepoData{
    id: number,
    html_url: string,
    stargazers_count: number,
    forks_count: number,
    language: string,
    name: string,
    private: boolean,
    description: string,
    owner: {
        login: string
    }
}
export interface IRepoData{
    id: number,
    html_url: string,
    stargazers_count: number,
    forks_count: number,
    language: string,
    name: string,
    private: boolean,
    description: string,
    owner: {
        login: string
    }
    clientStatus: string
}

export interface IEditableRepoData{
    name: string,
    private: boolean,
    description: string,
}

export interface IUserInfo{
    avatar_url: string,
    login: string
}