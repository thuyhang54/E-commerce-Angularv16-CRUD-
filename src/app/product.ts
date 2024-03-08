export interface Product {
    // productId: number;
    // productCategory: number;
    // productName: string;
    // productSize: string[];
    // productColor: string[];
    // productCode: string;
    // releaseDate: string;
    // price: number;
    // inStock : number;
    // description: string;
    // starRating: number;
    // imageUrl: string;
    id:number,
    title: string,
    description: string,
    price:number,
    discountPercentage: number,
    productCode: string;
    releaseDate: string,
    isNewlyAdded?: boolean,
    rating: number,
    stock: 94,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
}
