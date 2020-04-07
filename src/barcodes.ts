export class Barcodes{

    code: string;
    group: string;
    items: FoodItem[];
}

export class FoodItem{
    name: string;
    type: string;
    expirationDate: string;
    price: string;
    status: Number;
}