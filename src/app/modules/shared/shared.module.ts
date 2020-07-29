import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';

import { HomeComponent } from '../../layout/home/home.component';

import { HeaderComponent } from '../../layout/components/header/header.component';
import { FooterComponent } from '../../layout/components/footer/footer.component';
import { ConsoleComponent } from '../../layout/components/console/console.component';
import { BoardComponent } from '../../layout/components/board/board.component';

import {CdkScrollableModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ConsoleComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    CdkScrollableModule
  ],
  exports:[
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ConsoleComponent,
    BoardComponent
  ]
})
export class SharedModule { }
