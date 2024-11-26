export type Car = {
    id: number;
    model: string; 
    year: number; 
    manufacturer: string; 
    image_path: string;
    parts: { 
      name: string; 
      cost: number; 
      details: { 
        type?: string; 
        warranty_years?: number; 
        quantity?: number; 
      }; 
    }[]; 
}