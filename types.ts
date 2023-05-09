export type user = {
    client_id?: string | any;
    first: string;
    last: string;
    email: string;
    phone: string;
}

export interface authProps {
    user?: user,
    setUser: (data : any) => void,
}