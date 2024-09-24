import { Injectable } from '@angular/core';
import {
  Observable,
  concatMap,
  debounceTime,
  delay,
  filter,
  first,
  fromEvent,
  interval,
  map,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RxjsService {
  private clicks$ = fromEvent(document, 'click').pipe(
    map(() => {
      const date = Date.now();
      console.log('cada evento click', date);
      return date;
    })
  );

  constructor() {}

  public intervalObserver(): Observable<number> {
    return interval(1500).pipe(
      tap({
        next: (res) =>
          console.log(
            'Cada evento emitido por IntervalObserver==========>',
            res
          ),
      })
    );
  }

  public ofObserver(value: string): Observable<string> {
    return of(value).pipe(
      delay(1000) /* ,
      tap({
        next: (res) =>
          console.log('Cada evento emitido por ofObserver==========>', res),
        complete: () => console.log('se completo of'),
      }) */
    );
  }

  public exampleHttpRequestSwitchMap(): Observable<string> {
    return this.intervalObserver().pipe(
      switchMap((res) => this.ofObserver(`exampleHttpRequestSwitchMap ${res}`))
    );
  }

  public exampleHttpRequestConcatMap(): Observable<string> {
    return this.intervalObserver().pipe(
      concatMap(() => this.ofObserver(`exampleHttpRequestConcatMap()=>`))
    );
  }

  public exampleFilter(valueFilter: number): Observable<any> {
    return this.intervalObserver().pipe(filter((res) => res < valueFilter));
  }

  public exampleFilterFirst(valueFilter: number): Observable<any> {
    return this.intervalObserver().pipe(first());
  }

  public exampleFilterTake(valueFilter: number): Observable<any> {
    return this.intervalObserver().pipe(take(valueFilter));
  }

  public exampleFilterTakeUntil(): Observable<any> {
    return this.intervalObserver().pipe(takeUntil(this.clicks$));
  }

  public exampleDebounceTime(): Observable<any> {
    return this.clicks$.pipe(
      debounceTime(1500),
      tap((res) =>
        console.log('cada evento de click despues del debounce', res)
      )
    );
  }
}
