import * as React from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';

import MiniCalculatorPage from 'app/pages/mini-calculator';

import * as styles from './index.scss';

type Props = RouteComponentProps ;

class Index extends React.Component<Props> {
    public render() {
        return (
            <div className={styles['app']}>
                <div className={styles['content']}>
                    <Grid>
                        <Switch>
                            <Route path={'/'} component={MiniCalculatorPage} />
                        </Switch>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);
