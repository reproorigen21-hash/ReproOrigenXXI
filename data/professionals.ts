import type { Professional } from '../types/professional';

export const professionals: Professional[] = [
  {
    id: '1',
    name: 'José Martínez',
    trade: 'PVC',
    province: 'Castellón',
    city: 'Burriana',
    phone: '600000000',
    email: 'jose@email.com',
    autonomous: true,
    experience: 18,
    available: true,
    rating: 5
  },
  {
    id: '2',
    name: 'Miguel López',
    trade: 'ALUMINIO',
    province: 'Castellón',
    city: 'Vila-real',
    phone: '600000001',
    email: 'miguel@email.com',
    autonomous: true,
    experience: 12,
    available: false,
    rating: 4
  }
];
