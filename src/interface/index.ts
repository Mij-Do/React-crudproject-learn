export interface Iproduct {
    id: string | undefined;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: string;
        count: string;
    };
}

export interface IformList {
    id: string;
    name: 'title' | 'price' | 'description' | 'image';
    label: string;
    type: string;
}