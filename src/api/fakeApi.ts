import { IServerRepoData } from "../types/repo";

let dataList: Array<IServerRepoData> = [];

const randomAwait = ()=>{
    return new Promise<void>((resolve, reject) => {
        setTimeout(()=>{resolve()}, 1000 + Math.floor(Math.random() * 2000));
    })
}

const fakeResponse = (data: any, status: number, ok: boolean)=>{
    return {
        json: ()=>Promise.resolve(JSON.parse(JSON.stringify(data))),
        ok: ok,
        status: status
    }
}

export const sendGetRepoList = async (token: string) => {
    await randomAwait();
    return fakeResponse(dataList, 200, true);
}

export const sendCreateRepo = async (token:string, owner: string, data: {name: string, description: string, private: boolean}) => {
    const result = {
        id: Date.now(),
        html_url: "",
        stargazers_count: 0,
        forks_count: 0,
        language: "",
        name: data.name,
        private: data.private,
        description: data.description,
        owner: {
            login: owner
        }
    };
    dataList.push(result);
    await randomAwait();
    return fakeResponse(result, 200, true);
}

export const sendUpdateRepo = async (token:string, owner: string, data: {name: string, description: string, private: boolean}) => {
    const itemIndex = dataList.findIndex(it=>it.name == data.name);
    if (itemIndex == -1){
        throw new Error();
    }
    const result = {
        ...dataList[itemIndex],
        name: data.name,
        private: data.private,
        description: data.description,
    }
    dataList[itemIndex] = result;
    await randomAwait();
    return fakeResponse(result, 200, true);
}

export const sendDeleteRepo = async (token:string, owner: string, data: {name: string}) => {
    const itemIndex = dataList.findIndex(it=>it.name == data.name);
    if (itemIndex == -1){
        throw new Error();
    }
    dataList = dataList.filter((it, i)=> i != itemIndex);
    await randomAwait();
    return fakeResponse(undefined, 200, true);;
}

export const sendLogin = async (token:string) => {
    await randomAwait();
    return fakeResponse({
        login: 'mock user',
        avatarUrl: ''
    }, 200, true);
}

export default {
    sendCreateRepo,
    sendDeleteRepo,
    sendUpdateRepo,
    sendGetRepoList,
    sendLogin
}