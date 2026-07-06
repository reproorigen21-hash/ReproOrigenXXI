export interface Professional {
  id: string;
  name: string;
  trade:
    | 'PVC'
    | 'ALUMINIO'
    | 'CRISTAL'
    | 'ELECTRICIDAD'
    | 'FONTANERIA'
    | 'ALBAÑILERIA'
    | 'PINTURA'
    | 'PLADUR';
  province: string;
  city: string;
  phone: string;
  email: string;
  autonomous: boolean;
  experience: number;
  available: boolean;
  rating: number;
  notes?: string;
}
