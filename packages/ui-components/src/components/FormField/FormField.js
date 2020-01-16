import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cx } from 'ramda-extension';

import withGeneratedId from '../../utils/withGeneratedId';
import FormGroup from '../FormGroup';
import FormText from '../FormText';
import Label from '../Label';
import Box from '../Box';

const FormField = forwardRef(
	(
		{
			afterControl,
			beforeControl,
			control: ControlComponent,
			error,
			generatedId,
			groupProps,
			hasFloatingLabel,
			kind,
			labelComponent: LabelComponent = Label,
			label,
			labelProps,
			legendText,
			id,
			isLabelHidden,
			inline,
			name,
			warning,
			disabled,
			readOnly,
			suffix,
			required,
			formGroupClassName,
			...otherProps
		},
		ref
	) => {
		const uniqueId = id || `${name}-${generatedId}`;
		const formTextChildren = error || warning;
		const helpID = `${uniqueId}-help`;

		const ariaAttributes = formTextChildren ? { 'aria-describedby': helpID } : {};

		const hasError = Boolean(error);
		const hasWarning = Boolean(warning);

		return (
			<FormGroup
				className={cx(formGroupClassName, suffix && 'has-suffix', {
					'is-required': required,
					'is-disabled': disabled,
				})}
				hasError={hasError}
				hasFloatingLabel={hasFloatingLabel}
				hasLabel={Boolean(label) && !isLabelHidden}
				hasWarning={hasWarning}
				kind={kind}
				legendText={legendText}
				inline={inline}
				{...groupProps}
			>
				{beforeControl}
				<ControlComponent
					{...ariaAttributes}
					id={uniqueId}
					name={name}
					disabled={disabled}
					readOnly={readOnly}
					required={required}
					ref={ref}
					{...otherProps}
				/>
				{afterControl}
				{label && (
					<LabelComponent
						htmlFor={uniqueId}
						isHidden={isLabelHidden}
						isDisabled={disabled}
						isReadOnly={readOnly}
						{...labelProps}
					>
						{label}
					</LabelComponent>
				)}
				{legendText && <span className="form-control__legend">{legendText}</span>}
				{formTextChildren && (
					<FormText hasError={hasError} hasWarning={hasWarning} id={helpID}>
						{formTextChildren}
					</FormText>
				)}
				{suffix && <Box className="form-control__suffix">{suffix}</Box>}
			</FormGroup>
		);
	}
);

FormField.displayName = 'forwardRef(FormField)';

FormField.propTypes = {
	/** Additional content to render after the control. */
	afterControl: PropTypes.element,
	/** Additional content to render before the control. */
	beforeControl: PropTypes.element,
	/** Field's control component */
	control: PropTypes.elementType.isRequired,
	/** If set, control is disabled */
	disabled: PropTypes.bool,
	/** Node shown in error state. */
	error: PropTypes.node,
	formGroupClassName: PropTypes.string,
	/** @ignore */
	generatedId: PropTypes.string,
	/** Additional props to pass to the FormGroup */
	groupProps: PropTypes.object,
	/** If `true`, input label has floating animation. */
	hasFloatingLabel: PropTypes.bool,
	/** Used to pair the control with a label. If undefined, we use a generated one. */
	id: PropTypes.any,
	/** If `true`, label is absolutely positioned on the right side of the form group. */
	inline: PropTypes.bool,
	/** If `true`, label is hidden. */
	isLabelHidden: PropTypes.bool,
	/** Used to pass a context className to FormGroup (to properly style FormControl and Label) */
	kind: PropTypes.string,
	/** Label value */
	label: PropTypes.node,
	/** Label component, default is Label from ui-components */
	labelComponent: PropTypes.elementType,
	/** Additional props to pass to the Label */
	labelProps: PropTypes.object,
	/** Legend inside text input. */
	legendText: PropTypes.string,
	/** Name of the field */
	name: PropTypes.string.isRequired,
	/** If set, control is readOnly */
	readOnly: PropTypes.bool,
	required: PropTypes.bool,
	/** Assign a suffix component (e.g. Icon) to Input */
	suffix: PropTypes.node,
	/** Node shown in warning state. */
	warning: PropTypes.node,
};

export { FormField };

export default withGeneratedId(FormField);
