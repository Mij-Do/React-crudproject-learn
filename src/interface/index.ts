import { TProduct } from "../Types";

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
}

export interface IformList {
    id: string;
    name: TProduct;
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
    name: string;
    imageURL: string;
}