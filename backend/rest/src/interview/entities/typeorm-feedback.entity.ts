import { IsNumber, IsString } from 'class-validator';
import { TypeormBaseEntity } from 'src/common/typeorm-base.entity';
import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Feedback } from './feedback.entity';
import { InterviewDocs } from './interview-docs.entity';

@Entity('interviewDocs')
export class TypeormFeedbackEntity implements Feedback {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@PrimaryColumn({ length: 36, name: 'docs_uuid' })
	@IsString()
	docsUUID: string;

	@Column({ length: 36, name: 'user_uuid' })
	@IsString()
	userUUID: string;

	@Column({ name: 'start_time' })
	@IsNumber()
	startTime: number;

	@Column({ name: 'inner_index' })
	@IsNumber()
	innerIndex: number;
}
