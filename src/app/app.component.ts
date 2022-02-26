import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';

import { OverlayContainer } from '@angular/cdk/overlay'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { Platform } from '@angular/cdk/platform'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

import { AuthService } from "./service/auth.service"
import { IdbCrudService } from "./service-idb/idb-crud.service"

import { Store } from '@ngxs/store'
import { SetScreenSize, SetScreenWidth } from './state/device/device-state.actions'
import { SetUser, SetPage } from './state/auth/auth-state.actions'
import { SetBackground, SetIsDarkMode } from './state/device/device-state.actions'

import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Designer';
  @HostBinding('class') className = 'darkMode'

  destroyed = new Subject<void>();

  token:any
  prefs:any

  myInnerWidth = window.innerWidth

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ])

  constructor(
    private store: Store,
    public platform: Platform,
    private authService: AuthService,
    private idbCrudService: IdbCrudService,
    breakpointObserver: BreakpointObserver,
    private overlayContainer: OverlayContainer) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.store.dispatch(new SetScreenSize(this.displayNameMap.get(query) ?? 'Unknown'))
          this.store.dispatch(new SetScreenWidth(this.myInnerWidth + 'px'))
        }
      }
    })
  }

  ngOnInit(): void {
    this.authService.token().subscribe(token => {
      this.token = token
      localStorage.setItem('formToken', this.token)
    })
    this.idbCrudService.readAll('prefs').subscribe((prefs:any) => {
      this.prefs = prefs
      if (this.prefs.length > 0) {
        if (this.prefs[0]["user"]["isDarkMode"]) this.setMode('darkMode')
        else this.setMode('')

        this.store.dispatch(new SetUser(this.prefs[0]["user"]))
        this.store.dispatch(new SetIsDarkMode(this.prefs[0]["user"]["isDarkMode"]))
        this.store.dispatch(new SetPage('library'))
      }
      else {
        this.setMode('darkMode')
        this.store.dispatch(new SetPage('library'))
        this.store.dispatch(new SetIsDarkMode(true))
      }
    })
  }

  setMode(darkClassName:string) {
    this.className = 'darkMode' ? darkClassName : ''

    if (darkClassName === 'darkMode') {
      this.store.dispatch(new SetBackground('#3b3b3b'))
      this.overlayContainer.getContainerElement().classList.add(darkClassName)
    }
    else {
      this.store.dispatch(new SetBackground(''))
      this.overlayContainer.getContainerElement().classList.remove('darkMode')
    }
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }

}
