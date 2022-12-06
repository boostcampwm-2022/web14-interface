import { IsNumber, IsString } from 'class-validator';
import { TypeormBaseEntity } from 'src/common/typeorm-base.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { InterviewDocs } from './interview-docs.entity';
import { TypeormFeedbackEntity } from './typeorm-feedback.entity';

@Entity('interview_docs')
export class TypeormInterviewDocsEntity extends TypeormBaseEntity implements InterviewDocs {
	@PrimaryColumn({ length: 36 })
	@IsString()
	id: string;

	@Column({ length: 36, name: 'user_uuid' })
	@IsString()
	userUUID: string;

	@Column({ length: 100, name: 'video_url' })
	@IsString()
	videoUrl: string;

	@Column({ name: 'video_play_time' })
	@IsNumber()
	videoPlayTime: number;

	@OneToMany(() => TypeormFeedbackEntity, (feedback) => feedback.docs, {
		cascade: true,
	})
	feebacks: TypeormFeedbackEntity[];
}
