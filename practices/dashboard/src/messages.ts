import type { Locale } from '@visactor/vseed'

interface Messages {
  empty: string
  noData: string
  missing: string
}

export const messages: Record<Locale, Messages> = {
  'zh-CN': {
    empty: '暂无仪表盘内容',
    noData: '暂无数据',
    missing: '未找到引用的资源',
  },
  'en-US': {
    empty: 'No dashboard content yet',
    noData: 'No data',
    missing: 'Referenced resource not found',
  },
  'ja-JP': {
    empty: 'ダッシュボードにコンテンツがありません',
    noData: 'データがありません',
    missing: '参照先のリソースが見つかりません',
  },
  'de-DE': {
    empty: 'Noch keine Dashboard-Inhalte',
    noData: 'Keine Daten',
    missing: 'Referenzierte Ressource nicht gefunden',
  },
  'id-ID': {
    empty: 'Belum ada konten dasbor',
    noData: 'Tidak ada data',
    missing: 'Sumber daya yang dirujuk tidak ditemukan',
  },
  'fr-FR': {
    empty: 'Aucun contenu dans le tableau de bord',
    noData: 'Aucune donnée',
    missing: 'Ressource référencée introuvable',
  },
  'ko-KR': {
    empty: '대시보드 콘텐츠가 없습니다',
    noData: '데이터가 없습니다',
    missing: '참조한 리소스를 찾을 수 없습니다',
  },
  'vi-VN': {
    empty: 'Chưa có nội dung bảng điều khiển',
    noData: 'Không có dữ liệu',
    missing: 'Không tìm thấy tài nguyên được tham chiếu',
  },
}
