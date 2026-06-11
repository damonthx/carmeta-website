export interface NHTSAMake {
  Make_ID: number;
  Make_Name: string;
}

export interface NHTSAModel {
  Model_ID: number;
  Model_Name: string;
}

const POPULAR_MAKES = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Buick', 
  'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 
  'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 
  'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Lucid', 'Maserati', 'Mazda', 
  'McLaren', 'Mercedes-Benz', 'MINI', 'Mitsubishi', 'Nissan', 'Polestar', 
  'Porsche', 'Ram', 'Rivian', 'Rolls-Royce', 'Subaru', 'Tesla', 'Toyota', 
  'Volkswagen', 'Volvo'
];

export async function getMakes(): Promise<string[]> {
  // NHTSA's getAllMakes endpoint returns over 10,000 makes including obscure trailers.
  // We return a curated list of popular consumer vehicle makes for UX.
  return POPULAR_MAKES;
}

export async function getModelsForMake(make: string): Promise<string[]> {
  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(make)}?format=json`);
    if (!response.ok) return [];
    
    const data = await response.json();
    if (data && data.Results) {
      return data.Results
        .map((m: NHTSAModel) => m.Model_Name)
        .sort((a: string, b: string) => a.localeCompare(b));
    }
    return [];
  } catch (error) {
    console.error(`Failed to fetch NHTSA models for make ${make}:`, error);
    return [];
  }
}
