
export class InventoryDto {
    productId: number;
    quantityAvailable: number;
    minimumStockLevel: number;
    maximumStockLevel: number;
    reorderPoint: number;
    isActive: boolean;
    userId: string;
}