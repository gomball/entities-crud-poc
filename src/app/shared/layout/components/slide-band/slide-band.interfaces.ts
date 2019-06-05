interface SlideBandCommon {
  titleKey: string;
  icon: string;
}

export interface SlideBand extends SlideBandCommon {
  buttons: SlideBandButton[];
}

export interface SlideBandButton extends SlideBandCommon {
  action: () => any;
}
