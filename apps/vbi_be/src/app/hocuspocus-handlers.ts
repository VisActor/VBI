import { PrismaService } from './prisma.service'
import {
  appendChartUpdate,
  findChartRecord,
  listChartUpdates,
  parseChartRoomName,
  storeChartSnapshot,
} from '../chart/chart-collaboration'
import {
  appendInsightUpdate,
  findInsightRecord,
  listInsightUpdates,
  parseInsightRoomName,
  storeInsightSnapshot,
} from '../insight/insight-collaboration'
type CollaborationHandler = {
  label: string
  appendUpdate(prisma: PrismaService, id: string, update: Uint8Array): Promise<unknown>
  findRecord(prisma: PrismaService, id: string): Promise<{ data: Uint8Array } | null>
  listUpdates(prisma: PrismaService, id: string): Promise<Uint8Array[]>
  parseRoomName(documentName: string): string | null
  storeSnapshot(prisma: PrismaService, id: string, data: Uint8Array): Promise<unknown>
}

const handlers: CollaborationHandler[] = [
  {
    label: 'Chart',
    appendUpdate: appendChartUpdate,
    findRecord: findChartRecord,
    listUpdates: listChartUpdates,
    parseRoomName: parseChartRoomName,
    storeSnapshot: storeChartSnapshot,
  },
  {
    label: 'Insight',
    appendUpdate: appendInsightUpdate,
    findRecord: findInsightRecord,
    listUpdates: listInsightUpdates,
    parseRoomName: parseInsightRoomName,
    storeSnapshot: storeInsightSnapshot,
  },
]

export const resolveRoom = (documentName: string) => {
  for (const handler of handlers) {
    const id = handler.parseRoomName(documentName)
    if (id) return { handler, id }
  }
  throw new Error(`Invalid room name "${documentName}"`)
}
