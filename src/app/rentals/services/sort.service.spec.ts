import { SortService } from './sort.service';
import { Rental } from '../models/rental.model';

describe('SortService', () => {
  let service: SortService;

  beforeEach(() => {
    service = new SortService();
  });

  const rentals: Rental[] = [
    {
      id: '3',
      customerIdNumber: '1234',
      customerFullName: 'Esteban Sager',
      customerAddress: 'Calle Falsa 123',
      carId: 'ABCD',
      carModel: 'Honda CR-V',
      carType: 'SUV',
      startDate: '2025-04-10',
      endDate: '2025-04-12'
    },
    {
      id: '1',
      customerIdNumber: '123456',
      customerFullName: 'Cosme Fulanito',
      customerAddress: 'Rivadavia 2130',
      carId: '1234',
      carModel: 'Volkswagen Vento',
      carType: 'Sedan',
      startDate: '2025-04-05',
      endDate: '2025-04-10'
    },
    {
      id: '2',
      customerIdNumber: '32323',
      customerFullName: 'Jon Doe',
      customerAddress: '1234 Street',
      carId: 'PWOSL',
      carModel: 'Toyota Corolla',
      carType: 'Sedan',
      startDate: '2025-04-08',
      endDate: '2025-04-11'
    }
  ];

  it('should sort rentals by startDate ascending', () => {
    const result = service.sort(rentals, 'startDate', true);
    expect(result.map(r => r.id)).toEqual(['1', '2', '3']);
  });

  it('should sort rentals by endDate descending', () => {
    const result = service.sort(rentals, 'endDate', false);
    expect(result.map(r => r.id)).toEqual(['3', '2', '1']);
  });

  it('should sort rentals by customerFullName ascending', () => {
    const result = service.sort(rentals, 'customerFullName', true);
    expect(result.map(r => r.customerFullName)).toEqual([
      'Cosme Fulanito',
      'Esteban Sager',
      'Jon Doe'
    ]);
  });

  it('should sort rentals by carType descending', () => {
    const result = service.sort(rentals, 'carType', true);
    expect(result.map(r => r.carType)).toEqual(['SUV', 'Sedan', 'Sedan']);
  });

  it('should return an empty array when input is empty', () => {
    const result = service.sort([], 'id', true);
    expect(result).toEqual([]);
  });

  
});