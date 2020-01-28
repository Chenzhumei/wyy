import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Banner, SongSheet, Singer, HotTag } from '../../services/data-types/common.types';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/internal/operators';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';

// Resolve: 预先获取组件数据

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]];

@Injectable()
export class HomeResolverService implements Resolve<HomeDataType> {
  constructor(
    private homeServe: HomeService,
    private singerServe: SingerService
  ) {}
  resolve(): Observable<HomeDataType> {
    return forkJoin([
        this.homeServe.getBanners(),
        this.homeServe.getHotTags(),
        this.homeServe.getPersonalSheetList(),
        this.singerServe.getEnterSinger()
    ]).pipe(first());
  }
}
