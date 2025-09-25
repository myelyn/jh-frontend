'use client';

import { NavigationItem } from '../types';

interface TopNavigationProps {
  navigationItems: NavigationItem[];
  onTabClick: (item: NavigationItem) => void;
}

export default function TopNavigation({ 
  navigationItems, 
  onTabClick, 
}: TopNavigationProps) {
  return (
    <div className="px-5 h-[50px] flex items-center justify-between text-white">
      <div>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
