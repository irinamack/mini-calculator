import * as React from 'react';
import { WrappedFieldMetaProps } from 'redux-form';

import * as styles from './field-error.scss';

interface Props {
    meta: WrappedFieldMetaProps,
}

const FieldError: React.FunctionComponent<Props> = React.memo((props: Props) => {
    const {
        meta: {
            error,
        },
    } = props;

    return (
        <div className={styles['field-error']}>
            {error}
        </div>
    );
});

export default FieldError;
