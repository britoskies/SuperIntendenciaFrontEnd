import { iGenericService } from "./../interfaces/services/iGenericService";
import axios, { AxiosRequestConfig } from "axios";

export class GenericService<Entity> implements iGenericService<Entity> {
  private readonly apiBaseURl = "https://localhost:7067/api";

  public async getAll(service: string, config?: AxiosRequestConfig): Promise<Entity[]> {
    return await axios
      .get(`${this.apiBaseURl + service}`, config)
      .then(response => response.data)
      .catch(error => error);
  }
  public async getById(service: string, config?: AxiosRequestConfig): Promise<Entity> {
    return await axios
      .get(`${this.apiBaseURl + service}`, config)
      .then(response => response.data)
      .catch(error => error);
  }
  public async add(service: string, model: Entity, config?: AxiosRequestConfig): Promise<any> {
    return await axios
      .post(`${this.apiBaseURl + service}`, model, config)
      .then(response => response.data)
      .catch(error => error);
  }
  public async update(service: string, model: Entity, config?: AxiosRequestConfig): Promise<Entity> {
    return await axios
      .put(`${this.apiBaseURl + service}`, model, config)
      .then(response => response.data)
      .catch(error => error);
  }
  public async delete(service: string): Promise<any> {
    return await axios
      .delete(`${this.apiBaseURl + service}`)
      .then(response => response.data)
      .catch(error => error);
  }
}
