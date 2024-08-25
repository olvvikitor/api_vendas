import { EntityRepository, Repository, Like } from "typeorm";
import Client from "../entities/Client";

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
  public async findByName(
    name: string
  ): Promise<Client | Client[] | undefined> {
    // const client = await this.find({
    //   where: { name: Like(`${name}%`) },
    // });
    const client = await this.findOne(name)
    return client;
  }
  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.findOne(id);
    return client;
  }
  public async findAll(): Promise<Client[]> {
    const clients = await this.find();
    return clients;
  }
  public async createClient(client: Client): Promise<void> {
    await this.save(client);
  }
  public async deleteClient(id: string): Promise<void> {
    await this.delete(id);
  }
  public async updateClient(id: string, client: Client): Promise<void> {
    await this.update(id, client);
  }
  public async findExists(email: string): Promise<Client | undefined> {
    const client = await this.findOne({
      where: { email },
    });
    return client;
  }
}
export default ClientRepository;
