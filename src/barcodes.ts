export class Barcodes{

    code: string;
    group: string;
    items: FoodItem[];
}

export class FoodItem{
    pantryId: Number;
    name: string;
    type: string;
    expirationDate: string;
    price: string;
    expiredStatus: Number;
    pantryStatus: Number;
}

export class GroceryItem{
    groceryId: Number;
    name: string;
    type: string;
    expirationDate: string;
    price: string;
    expiredStatus: Number;
    pantryStatus: Number;
}

export class TrendsItem{
    name: string;
    type: string;
    price: string;
    expiredStatus: Number;
    pantryStatus: Number;
    month: string;
}