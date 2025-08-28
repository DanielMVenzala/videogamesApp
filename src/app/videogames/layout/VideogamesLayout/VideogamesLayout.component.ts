import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../../shared/components/top-menu/top-menu.component";

@Component({
  selector: 'app-videogames-layout',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './VideogamesLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideogamesLayoutComponent { }
