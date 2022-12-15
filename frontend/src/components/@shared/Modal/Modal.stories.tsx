import React from 'react';
import { Story } from '@storybook/react';
import Modal from './Modal';

export default {
	component: Modal,
	title: '@shared/Modal',
};

const Template: Story = (args) => (
	<Modal>
		<Modal.Title>타이틀</Modal.Title>
		<Modal.ButtonArea>
			<Modal.Button style="text" color="black">
				취소
			</Modal.Button>
			<Modal.Button>확인</Modal.Button>
		</Modal.ButtonArea>
	</Modal>
);

export const Default = Template.bind({});
Default.args = {};

const SingleButtonModalTemplate: Story = (args) => (
	<Modal>
		<Modal.Title>타이틀</Modal.Title>
		<Modal.ButtonArea>
			<Modal.Button style="contained" color="red">
				취소
			</Modal.Button>
		</Modal.ButtonArea>
	</Modal>
);

export const SingleButtonModal = SingleButtonModalTemplate.bind({});
SingleButtonModal.args = {};

const TextModalTemplate: Story = (args) => (
	<Modal>
		<Modal.Title>타이틀</Modal.Title>
		<Modal.ContentArea>
			<span>본문 텍스트입니다.</span>
		</Modal.ContentArea>
		<Modal.ButtonArea>
			<Modal.Button style="text" color="black">
				취소
			</Modal.Button>
			<Modal.Button onClick={() => alert('안녕')}>확인</Modal.Button>
		</Modal.ButtonArea>
	</Modal>
);

export const TextModal = TextModalTemplate.bind({});
TextModal.args = {};

const TextFieldModalTemplate: Story = (args) => (
	<Modal>
		<Modal.Title>타이틀</Modal.Title>
		<Modal.ContentArea>
			<Modal.TextField width={'100%'} textAlign={'center'} />
		</Modal.ContentArea>
		<Modal.ButtonArea>
			<Modal.Button style="text" color="black">
				취소
			</Modal.Button>
			<Modal.Button>확인</Modal.Button>
		</Modal.ButtonArea>
	</Modal>
);

export const TextFieldModal = TextFieldModalTemplate.bind({});
TextFieldModal.args = {};
