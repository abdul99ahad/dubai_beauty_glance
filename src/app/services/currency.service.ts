import { HttpService } from "./http.service";
import { CurrencyApiKey } from "../const/api-key";
import { firstValueFrom } from "rxjs";
import { CurrencyConvert } from "../interfaces/currencies.interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  public constructor(private readonly httpService: HttpService) {}

  public get selectedCurrency(): string {
    const currencyCode = localStorage.getItem("currency");

    return currencyCode ?? "AED";
  }

  public set selectedCurrency(currencyCode: string) {
    localStorage.setItem("currency", currencyCode);
    window.location.reload();
  }

  public async handleCurrency<T>(input: T, ...fields: Array<string>): Promise<T> {
    if (this.dataIsAbsent(input)) return input as T;

    if (Array.isArray(input)) return await this.handleArrayData(input, fields) as unknown as T;

    if (typeof input === "object") return await this.handleObjectData(input, fields);

    return input;
  }

  private async handleObjectData(data: any, fields: Array<string>): Promise<any> {
    const currentObject: any = {};

    for (const [objectKey, objectValue] of Object.entries(data)) {
      if (this.dataIsAbsent(objectValue)) {
        currentObject[objectKey] = objectValue;
        continue;
      }

      if (Array.isArray(objectValue)) {
        currentObject[objectKey] = await this.handleArrayData(objectValue, fields);
        continue;
      }

      if (typeof objectValue === "object") {
        currentObject[objectKey] = await this.handleObjectData(objectValue, fields);
        continue;
      }

      if (fields.includes(objectKey)) {
        currentObject[objectKey] = await this.convertCurrency(objectValue as string);
        continue;
      }

      currentObject[objectKey] = objectValue;
    }

    return currentObject;
  }

  private async handleArrayData(input: Array<any>, fields: Array<string>): Promise<Array<any>> {
    const currentArray: Array<any> = [];

    for (const inputPiece of input) {
      if (this.dataIsAbsent(inputPiece)) {
        currentArray.push(inputPiece);
        continue;
      }

      if (Array.isArray(inputPiece)) {
        currentArray.push(await this.handleArrayData(inputPiece, fields));
        continue;
      }

      if (typeof inputPiece === "object") {
        currentArray.push(await this.handleObjectData(inputPiece, fields));
        continue;
      }

      currentArray.push(inputPiece);
    }

    return currentArray;
  }

  private dataIsAbsent(input: unknown): input is null | undefined {
    return input === null || input === undefined;
  }

  private async convertCurrency(amount: string): Promise<number> {
    if (this.selectedCurrency === "AED") return +amount;

    const convertUrl = new URL("https://api.apilayer.com/currency_data/convert");
    convertUrl.searchParams.append("to", this.selectedCurrency);
    convertUrl.searchParams.append("from", "AED");
    convertUrl.searchParams.append("amount", amount);
    const response$ = this.httpService.getWithApiKey<CurrencyConvert>(convertUrl.toString(), "apikey", CurrencyApiKey);

    const response = await firstValueFrom<CurrencyConvert>(response$);
    const convertedAmount = response.result.toFixed(2);

    return +convertedAmount;
  }
}
