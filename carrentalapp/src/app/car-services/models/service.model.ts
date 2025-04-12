export interface ScheduledService {
    carId: string;
    carType: string;
    carModel: string;
    serviceStartDate: Date,
    serviceDurationInDays: number
}