import * as React from 'react';
import { reduxForm, Field, Form, InjectedFormProps } from 'redux-form';
import { compose } from 'ramda';
import * as classnames from 'classnames';

import NumericInputField from 'app/atoms/fields/numeric-input/numeric-input-field';
import { maxLength } from 'app/atoms/fields/validations';
import { formatNumber } from 'app/helpers/formatter';
import { MINI_CALCULATOR_FORM } from './constants';

import * as styles from './mini-calculator-form.scss';

export interface MiniCalculatorFormData {
    amount: number;
}

type Props = InjectedFormProps<MiniCalculatorFormData, any>;

const maxLength10 = maxLength(10);

class MiniCalculatorForm extends React.Component<Props> {

    render() {
        const {
            submitting,
            handleSubmit,
            valid,
        } = this.props;
        const disabled = !valid || submitting;
        const buttonClassName = classnames(
            styles['button'],
            disabled && styles['disabled'],
        );

        return (
            <div className={styles['mini-calculator-form']}>
                <Form onSubmit={handleSubmit} className={styles['form']}>
                    <div className={styles['field']}>
                        <Field
                            name="amount"
                            component={NumericInputField}
                            validate={maxLength10}
                            normalize={formatNumber}
                        />
                    </div>
                    <button className={buttonClassName}disabled={disabled}>Submit</button>
                </Form>
            </div>
        );
    }
}

export default compose(
    // @ts-ignore
    reduxForm<MiniCalculatorFormData, OwnProps>({ form: MINI_CALCULATOR_FORM, touchOnChange: true }),
)(MiniCalculatorForm);
