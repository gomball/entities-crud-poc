export interface ViewportLayout {
  minScreenWidth: number;
  minScreenHeight: number;
  sidebarWidth: number;
  topbarHeight: number;
  entityToolbarHeight: number;
  gridToolbarHeight: number;
}

export const DEFAULT_VIEWPORT_LAYOUT: ViewportLayout = {
  minScreenWidth: 1024,
  minScreenHeight: 768,
  sidebarWidth: 40,
  topbarHeight: 30,
  entityToolbarHeight: 66,
  gridToolbarHeight: 30
};
