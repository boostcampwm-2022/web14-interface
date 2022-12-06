import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Feedback } from './feedback.entity';
import { TypeormInterviewDocsEntity } from './typeorm-interview-docs.entity';

@Entity('feedback')
export class TypeormFeedbackEntity implements Feedback {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ length: 36, name: 'user_uuid' })
	@IsString()
	userUUID: string;

	@Column({ name: 'start_time' })
	@IsNumber()
	startTime: number;

	@Column({ name: 'inner_index' })
	@IsNumber()
	innerIndex: number;

	@ManyToOne(() => TypeormInterviewDocsEntity, (docs) => docs.feebacks, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'docs_uuid' })
	docs: TypeormInterviewDocsEntity;
}
