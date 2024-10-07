import { DataSource } from 'typeorm';
import { Deal } from '@shared/Deal';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [Deal],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize().then(() => console.log('DB IS READY'));

export function getAllDeals(): Promise<Deal[]> {
  return AppDataSource.manager.find(Deal);
}

export function getDealById(id: number): Promise<Deal | null> {
  return AppDataSource.manager.findOneBy<Deal>(Deal, { id });
}

export function createDeal(data: Partial<Deal>): Promise<Deal> {
  const dealRep = AppDataSource.getRepository(Deal);
  const deal = dealRep.create(data);
  return dealRep.save(deal);
}

export async function updateDealByToken(token: string, data: Partial<Deal>): Promise<Deal> {
  const dealRep = AppDataSource.getRepository(Deal);
  const result = await dealRep.update({ checkoutId: token }, data);
  return result.raw;
}

export async function updateDealByOfferId(offerId: string, data: Partial<Deal>): Promise<Deal> {
  const dealRep = AppDataSource.getRepository(Deal);
  const result = await dealRep.update({ offerId }, data);
  return result.raw;
}

export async function updateDealByAccountId(accountId: string, data: Partial<Deal>): Promise<Deal> {
  const dealRep = AppDataSource.getRepository(Deal);
  const result = await dealRep.update({ accountId }, data);
  return result.raw;
}

export async function deleteDeal(id: number): Promise<void> {
  const dealRep = AppDataSource.getRepository(Deal);
  await dealRep.delete({ id });
}
