import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { CreateReportDto } from '../dtos/create-report.dto';
import { User } from 'src/users/entities/user.entity';
import { GetEstimateDto } from '../dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async createReport(reportDto: CreateReportDto, user: User) {
    const newReport = await this.repo.create(reportDto);
    newReport.user = user;
    return this.repo.save(newReport);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate({ make, mileages, year, lng, lat }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .orderBy('ABS(mileages - :mileages)', 'DESC')
      .setParameters({ mileages })
      .limit(3)
      .getRawOne();
  }
}
