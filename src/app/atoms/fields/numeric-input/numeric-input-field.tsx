import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import * as classnames from 'classnames';

import FieldError from '../field-error';

import * as styles from './numeric-input.scss';

type Props = WrappedFieldProps;

const NumericInputField = ({ input, meta }: Props) => {
    const hasError: boolean = (meta.touched && !meta.pristine || meta.submitFailed) && !!meta.error;
    const className = classnames(
        styles['numeric-input'],
        hasError && styles['has-error'],
    );

    return (
        <div>
            <div className={className}>
                <input
                    {...input}
                    autoCorrect="Off"
                />
            </div>
            {hasError &&
                <FieldError meta={meta}/>
            }
        </div>
    );
};

export default NumericInputField;
