import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../user/user.module'
import { PostModule } from '../post/post.module'
import { PrismaService } from './prisma.service'
import { ChartModule } from '../chart/chart.module'
import { InsightModule } from '../insight/insight.module'
import { AgentModule } from '../agent/agent.module'

@Module({
  imports: [UserModule, PostModule, ChartModule, InsightModule, AgentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
