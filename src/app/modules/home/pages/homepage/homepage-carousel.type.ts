export type HomepageNgxCarouselsState = {
  [carouselName: string]: EachNgxCarouselState
};

export type EachNgxCarouselState = {
  configuration: NgxCarouselConfiguration;
  data: Array<any>;
  currentSlide: number;
  numOfSlides: number;
  percentageOfSliderMoved: number;
}

export type NgxCarouselConfiguration = any;
