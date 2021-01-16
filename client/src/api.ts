import { exception } from "console";
import { IError } from "./ResponseApiModels";

const apiUrl = 'http://localhost:5000/api'

export async function fetchApi<T>(url: string): Promise<T> {
  url = apiUrl + url

  try {
    const response: Response = await fetch(url);
    const data: T | IError = await response.json()

    if (response.ok) {
      return data as T
    }

    throw new Error((data as IError).message)
  } catch (e) {
    throw new Error(e.toString())
  }
}

