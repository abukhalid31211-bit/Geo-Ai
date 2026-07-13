import { create } from 'zustand';
import type { TargetType } from '@apptypes/detector.types';

interface LastScan {
  depth:       number;
  confidence:  number;
  targetType:  TargetType;
  scannedAt:   string;
}

interface AIInsight {
  text:      string;
  createdAt: string;
}

interface HomeState {
  isRefreshing: boolean;
  aiInsight:    AIInsight | null;
  lastScan:     LastScan | null;

  refreshHomeData:        () => Promise<void>;
  setLastScan:             (scan: LastScan) => void;
  generateAIInsight:       () => string | null;
}

// Arabic phrasing templates keyed by target type — picked at random for variety.
const INSIGHT_TEMPLATES: Record<TargetType, (depth: number) => string> = {
  gold:    (d) => `تم رصد شذوذ يتوافق مع تواجد معدن ثمين على عمق ${d}م، يُنصح بإجراء فحص تكميلي`,
  void:    (d) => `تم رصد فراغ محتمل على عمق ${d}م، قد يشير إلى تجويف أو كهف تحت السطح`,
  water:   (d) => `تم رصد مؤشرات مياه جوفية على عمق ${d}م بناءً على نمط الانعكاس`,
  pipe:    (d) => `تم رصد جسم أنبوبي على عمق ${d}م، يتوافق مع بنية تحتية مدفونة`,
  metal:   (d) => `تم رصد شذوذ معدني على عمق ${d}م، يُنصح بمراجعة النتائج التفصيلية`,
  unknown: (d) => `تم رصد شذوذ غير مصنّف على عمق ${d}م، راجع نتائج الفحص لمزيد من التفاصيل`,
};

export const useHomeStore = create<HomeState>()((set, get) => ({
  isRefreshing: false,
  aiInsight:    null,
  lastScan:     null,

  refreshHomeData: async () => {
    set({ isRefreshing: true });

    await new Promise<void>(resolve => setTimeout(resolve, 1000));

    const { lastScan } = get();
    if (lastScan) {
      const text = get().generateAIInsight();
      if (text) {
        set({ aiInsight: { text, createdAt: new Date().toISOString() } });
      }
    }

    set({ isRefreshing: false });
  },

  setLastScan: (scan) => set({ lastScan: scan }),

  generateAIInsight: () => {
    const { lastScan } = get();
    if (!lastScan) return null;
    const template = INSIGHT_TEMPLATES[lastScan.targetType] ?? INSIGHT_TEMPLATES.unknown!;
    return template(lastScan.depth);
  },
}));
