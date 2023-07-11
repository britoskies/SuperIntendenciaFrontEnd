import { iGenericService } from "./iGenericService";
import { iProduct } from "./../models/iProduct";

export interface iProductService extends iGenericService<iProduct> {}
