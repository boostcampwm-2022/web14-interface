declare module '*.svg' {
	import React = require('react');

	export const ReactComponent: React.ReactNode<React.SVGProps<SVGSVGElement>>;
}