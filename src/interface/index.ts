export interface Iproduct {
    id: string | undefined;
    title: string;
    price: string;
    description: string;
    imageURL: string;
    category: string;
    colors: string[];
    rating: {
        rate: string;
        count: string;
    };
}

export interface IformList {
    id: string;
    name: 'title' | 'price' | 'description' | 'imageURL';
    label: string;
    type: string;
}