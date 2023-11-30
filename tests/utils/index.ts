import { DataSource } from "typeorm";

export const truncateTables = async (connection: DataSource) => {
  const entities = connection.entityMetadatas;
  for (const entity of entities) {
    const repositary = connection.getRepository(entity.name);
    await repositary.clear();
  }
};
