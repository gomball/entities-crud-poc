export interface EntityEditSidebar {
  tabs: EntityEditSidebarTab[];
}

export interface EntityEditSidebarTab {
  id: string;
  initialsKey: string;
  titleKey: string;
  route?: string;
}
