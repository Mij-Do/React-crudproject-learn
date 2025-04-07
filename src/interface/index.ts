export interface Iproduct {
    id: string | undefined;
    title: string;
    price: string;
    description: string;
    imageURL: string;
    category: {
        name: string,
        imageURL: string,
    };
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

export interface ICategory {
    id: string;
    name: string;
    imageURL: string;
}

export interface OptionType {
    id: string;
    value: string;
    label: string;
    imageURL: string;
}