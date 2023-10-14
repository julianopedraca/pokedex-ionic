import { HttpParams } from '@angular/common/http';

export function createHttpParams(dto: any): HttpParams {
  let params = new HttpParams();

  for (const key in dto) {
    if (dto.hasOwnProperty(key) && dto[key] !== undefined && dto[key] !== null) {
      params = params.set(key, dto[key]);
    }
  }

  return params;
}