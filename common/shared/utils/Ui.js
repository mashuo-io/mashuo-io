import React from 'react';
import './ui.scss';
import classNames from 'classnames'

export const Form = props => {
	let className = classNames('pure-form', 'my-form', {'pure-form-stacked': props.stacked});
	return (
		<form {...props} className={className} >
			{props.children}
		</form>
	)};

export const Container = props => (
	<div {...props} className="my-container">
		{props.children}
	</div>
);

export const Input = props => {
	let control = props.type === 'textarea'
		? <textarea {...props} />
		: <input {...props} />;

	if (props.label) {
		return (
			<div>
				<label>{props.label}</label>
				{control}
			</div>
		)
	}
	return control
};

export const FieldSet = props => {
	return (
		<filedset>
			<legend>{props.label}</legend>
			{props.children}
		</filedset>
	)
};

export const Row = props => (
	<div className="pure-g">
		{props.children}
	</div>
);

export const Col = props => (
	<div {...props} className={calculateUnitClass(props)} >
		{props.children}
	</div>
);

export const Button = props => (
	<button className="pure-button pure-button-primary">{props.children}</button>
);

export const Icon = props => (
	<i className={`fa fa-${props.fa}`} />
);

const calculateUnitClass = (props) => {
	let medias = ['always', 'sm', 'md', 'lg', 'xl'];
	let classes = medias.reduce((ret, x)=>{
		let cl = props[x];
		if (typeof cl === 'number') cl = Math.floor(cl).toString();
		if (typeof cl !== 'string') return ret;
		let [n, m = '12'] = cl.split('-');
		ret.push(`pure-u-${ x==='always' ? '': x }-${n}-${m}`);
		return ret;
	}, []);
	return classNames(classes);
};


