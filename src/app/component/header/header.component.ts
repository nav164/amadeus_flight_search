import { Component, EventEmitter, Input, OnInit, Output, Renderer2, RendererFactory2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showMenu;
  @Output() showMenuChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isDarkMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  darkModeActive: boolean = false;
  loggedIn = false;
  color: ThemePalette = 'accent';
  private renderer: Renderer2;
  private colorSchemePrefix = 'color-scheme-';
  
  constructor(public authService: AuthService,
    rendererFactory: RendererFactory2) { 
      this.renderer = rendererFactory.createRenderer(null, null);
    }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.showMenuChange.emit(this.showMenu);
  }

  modeToggleSwitch() {
    this.isDarkMode.emit(this.darkModeActive);
    if(this.darkModeActive) {
      // Remove the old color-scheme class
      this.renderer.removeClass( document.body, this.colorSchemePrefix + 'light' );
      // Add the new / current color-scheme class
      this.renderer.addClass(document.body, this.colorSchemePrefix + 'dark');
    } else {
      // Remove the old color-scheme class
      this.renderer.removeClass( document.body, this.colorSchemePrefix + 'dark' );
      // Add the new / current color-scheme class
      this.renderer.addClass(document.body, this.colorSchemePrefix + 'light');
    }
  }
}
