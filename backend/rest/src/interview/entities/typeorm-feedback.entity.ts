import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Feedback } from './feedback.entity';
import { TypeormInterviewDocsEntity } from './typeorm-interview-docs.entity';

@Entity('feedback')
export class TypeormFeedbackEntity implements Feedback {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ length: 45 })
	@IsString()
	userId: string;

	@Column()
	@IsNumber()
	startTime: number;

	@Column()
	@IsNumber()
	innerIndex: number;

	@Column()
	@IsString()
	content: string;

	@ManyToOne(() => TypeormInterviewDocsEntity, (docs) => docs.feedbackList, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'docs_uuid' })
	docs: TypeormInterviewDocsEntity;
}
