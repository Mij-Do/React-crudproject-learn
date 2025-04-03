export interface Iproduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface IformList {
    id: string;
    name: string;
    label: string;
    type: string;
}