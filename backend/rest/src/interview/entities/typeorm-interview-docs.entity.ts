import { IsNumber, IsString } from 'class-validator';
import { TypeormBaseEntity } from 'src/common/typeorm-base.entity';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { InterviewDocs } from './interview-docs.entity';

@Entity('interviewDocs')
export class TypeormInterviewDocsEntity extends TypeormBaseEntity implements InterviewDocs {
	@PrimaryColumn({ length: 100, name: 'docs_uuid' })
	@IsString()
	docsUUID: string;

	@Column({ length: 100, name: 'user_uuid' })
	@IsString()
	userUUID: string;

	@Column({ length: 100, name: 'video_url' })
	@IsString()
	videoUrl: string;

	@Column({ name: 'video_play_time' })
	@IsNumber()
	videoPlayTime: number;
}
