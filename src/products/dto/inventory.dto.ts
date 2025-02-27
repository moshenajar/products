
export class InventoryDto {
    productId?: number;// At the time of product creation there is no identification yet
    quantityAvailable: number;
    minimumStockLevel: number;
    maximumStockLevel: number;
    reorderPoint: number;
    isActive: boolean;
    ban?: number;
}