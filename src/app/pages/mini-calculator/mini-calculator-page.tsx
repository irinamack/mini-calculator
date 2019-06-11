import * as React from 'react';
import { compose, isEmpty } from 'ramda';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';

import * as calculatorActions from 'app/reducers/mini-calculator/actions';
import { getAnswer } from 'app/reducers/mini-calculator/selectors';
import MiniCalculatorForm from './mini-calculator-form';
import { MINI_CALCULATOR_FORM } from './constants';

import * as styles from './mini-calculator-page.scss';

interface State {
    isOpen: boolean;
}

interface StateProps {
    answer: number,
}

interface DispatchProps {
    actions: {
        multiplyValues: typeof calculatorActions,
        form: {
            reset: typeof reset,
        },
    }
}

type Props = DispatchProps & StateProps;

class MiniCalculatorPage extends React.Component<Props, State> {
    public readonly state = {
        isOpen: false,
    };

    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    handleSubmit(value: any) {
        const { actions } = this.props;

        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));

        actions.multiplyValues.multipliedValue(value)
        // @ts-ignore:line
            .then(() => actions.form.reset(MINI_CALCULATOR_FORM));
    }

    render() {
        const { answer } = this.props;
        const { isOpen } = this.state;

        return (
            <div className={styles['mini-calculator-page']}>
                {!isEmpty(answer) && isOpen &&
                    <div className={styles['overlay']} onClick={this.toggleShow}>
                        <div className={styles['popover']}>
                            <div className={styles['text']}>
                                Answer: <span> {answer} </span>
                            </div>
                        </div>
                    </div>
                }

                <div className={styles['form-name']}>
                    Mini Calculator
                </div>
                <MiniCalculatorForm onSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any): StateProps => ({
    answer: getAnswer(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: {
        multiplyValues: bindActionCreators(calculatorActions, dispatch),
        form: {
            reset: bindActionCreators(reset, dispatch),
        },
    },
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(MiniCalculatorPage);
