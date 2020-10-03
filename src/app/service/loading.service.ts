import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConstant } from '../config/constant';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Contains in-progress loading requests
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();
  constructor() { }

  /**
   * Set the subject behaviour variable with boolean value.
   * @author Naveen
   * @param loading boolean
   * @param url string
   */
  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error(AppConstant.url_not_present_error);
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    }else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }
}
