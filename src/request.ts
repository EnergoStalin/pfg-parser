import { AxiosInstance } from 'axios';

export async function getDeclarationById(api: AxiosInstance, id: number) {
    return (await api.get(`${process.env.PARSER_DECLARATIONS_PATH}/${id}`)).data
}