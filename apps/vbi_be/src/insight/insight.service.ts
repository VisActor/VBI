import { Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { PrismaService } from '../app/prisma.service'
import { buildInsightDSL, createInsightDoc, encodeDoc, toPrismaBytes } from '../common/vbi-doc'
import { getCollaborationWebSocketUrl } from '../common/collaboration'
import { buildInsightRoomName, clearInsightUpdates } from './insight-collaboration'
import { CreateInsightDto } from './dto/create-insight.dto'
import { UpdateInsightDto } from './dto/update-insight.dto'

const summarySelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} as const

const snapshotSelect = {
  ...summarySelect,
  data: true,
} as const

@Injectable()
export class InsightService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.insight.findMany({
      orderBy: { updatedAt: 'desc' },
      select: summarySelect,
    })
  }

  async findOne(id: string) {
    const insight = await this.requireSnapshot(id)
    return {
      id: insight.id,
      name: insight.name,
      createdAt: insight.createdAt,
      updatedAt: insight.updatedAt,
      content: buildInsightDSL(new Uint8Array(insight.data)).content,
    }
  }

  async create(dto: CreateInsightDto) {
    const id = randomUUID()
    await this.prisma.insight.create({
      data: {
        id,
        name: dto.name?.trim() || 'Untitled Insight',
        data: toPrismaBytes(encodeDoc(createInsightDoc(id, dto.content ?? ''))),
      },
    })
    return this.findOne(id)
  }

  async update(id: string, dto: UpdateInsightDto) {
    const insight = await this.requireSummary(id)
    await this.prisma.insight.update({
      where: { id },
      data: {
        name: dto.name?.trim() || insight.name,
        ...(dto.content !== undefined
          ? {
              data: toPrismaBytes(encodeDoc(createInsightDoc(id, dto.content))),
            }
          : {}),
      },
    })
    if (dto.content !== undefined) {
      await clearInsightUpdates(this.prisma, id)
    }
    return this.findOne(id)
  }

  async getCollaborationSession(id: string) {
    return {
      resourceId: id,
      protocol: 'hocuspocus' as const,
      roomName: buildInsightRoomName(id),
      websocketUrl: getCollaborationWebSocketUrl(),
      resource: await this.requireSummary(id),
    }
  }

  async remove(id: string) {
    await this.requireSummary(id)
    await clearInsightUpdates(this.prisma, id)
    return this.prisma.insight.delete({ where: { id }, select: summarySelect })
  }

  private async requireSummary(id: string) {
    const insight = await this.prisma.insight.findUnique({
      where: { id },
      select: summarySelect,
    })
    if (!insight) {
      throw new NotFoundException(`Insight ${id} not found`)
    }
    return insight
  }

  private async requireSnapshot(id: string) {
    const insight = await this.prisma.insight.findUnique({
      where: { id },
      select: snapshotSelect,
    })
    if (!insight) {
      throw new NotFoundException(`Insight ${id} not found`)
    }
    return insight
  }
}
